import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Instances1680821581835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'instances',
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
                    name: 'userId',
                    type: 'uuid',
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKey('instances', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('instances');
        const foreignKey = table.foreignKeys.find(
            fk => fk.columnNames.indexOf('userId') !== -1
        );
        await queryRunner.dropForeignKey('instances', foreignKey);
        await queryRunner.dropColumn('instances', 'userId');
        await queryRunner.dropTable('instances');
    }
}
