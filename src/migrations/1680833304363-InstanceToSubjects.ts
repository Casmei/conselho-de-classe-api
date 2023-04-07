import { DropTable } from "src/utils/drop-table";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class InstanceToSubjects1680833304363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_to_instance_subjects',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'userToInstanceId',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'subjectId',
                    type: 'uuid',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKeys('user_to_instance_subjects', [
            new TableForeignKey({
                columnNames: ['userToInstanceId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user_to_instance',
                onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                columnNames: ['subjectId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'subjects',
                onDelete: 'CASCADE'
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await new DropTable().dropWithForeigns(
            'user_to_instance_subjects',
            [
                'userToInstanceId',
                'subjectId'
            ],
            queryRunner
        );
    }
}
