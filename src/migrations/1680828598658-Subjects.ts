import { DropTable } from "src/utils/drop-table";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Subjects1680828598658 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'subjects',
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
                    name: 'instanceId',
                    type: 'uuid',
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey('subjects', new TableForeignKey({
            columnNames: ['instanceId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'instances'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await new DropTable().dropWithForeigns('subjects', ['instanceId'], queryRunner);
    }

}
