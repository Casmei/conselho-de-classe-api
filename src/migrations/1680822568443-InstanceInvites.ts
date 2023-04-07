import { query } from "express";
import { DropTable } from "src/utils/drop-table";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class InstanceInvites1680822568443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'instance_invites',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'invite_extra_data',
                    type: 'jsonb',
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

        await queryRunner.createForeignKeys('instance_invites', [
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
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
            'instance_invites',
            ['userId', 'instanceId'],
            queryRunner
        );
    }
}
