import { DropTable } from "src/utils/drop-table";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class InstanceToClasses1680833631196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_to_instance_classes',
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
                    name: 'classId',
                    type: 'uuid',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKeys('user_to_instance_classes', [
            new TableForeignKey({
                columnNames: ['userToInstanceId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user_to_instance',
                onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                columnNames: ['classId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'classes',
                onDelete: 'CASCADE'
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await new DropTable().dropWithForeigns(
            'user_to_instance_classes',
            [
                'userToInstanceId',
                'classId'
            ],
            queryRunner
        );
    }
}
