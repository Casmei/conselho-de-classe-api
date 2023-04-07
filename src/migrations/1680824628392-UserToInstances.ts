import { DropTable } from "src/utils/drop-table";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class UserToInstances1680824628392 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_to_instance',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['MANAGER', 'TEACHER'],
                    isNullable: false
                },
                {
                    name: 'subscription_instance',
                    type: 'date',
                    isNullable: true
                },
                {
                    name: 'userId',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'instanceId',
                    type: 'uuid',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKeys('user_to_instance', [
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
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
            'user_to_instance',
            ['instanceId', 'userId'],
            queryRunner
        );
    }

}
