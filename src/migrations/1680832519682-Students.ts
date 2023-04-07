import { DropTable } from "src/utils/drop-table";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Students1680832519682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'students',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'registration',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'contract',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'courseId',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'classId',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'instanceId',
                    type: 'uuid',
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKeys('students', [
            new TableForeignKey({
                columnNames: ['courseId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses'
            }),
            new TableForeignKey({
                columnNames: ['classId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'classes'
            }),
            new TableForeignKey({
                columnNames: ['instanceId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'instances',
                onDelete: 'CASCADE'
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await new DropTable().dropWithForeigns(
            'students',
            [
                'courseId',
                'classId',
                'instanceId'
            ],
            queryRunner
        )
    }
}
