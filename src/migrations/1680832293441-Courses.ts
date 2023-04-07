import { DropTable } from "src/utils/drop-table";
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Courses1680832293441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'courses',
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

        await queryRunner.createForeignKey('courses', new TableForeignKey({
            columnNames: ['instanceId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'instances',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await new DropTable().dropWithForeigns('courses', ['instanceId'], queryRunner);
    }
}
