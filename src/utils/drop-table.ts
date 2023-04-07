import { QueryRunner } from "typeorm";

export class DropTable {
    public dropWithForeigns = async (
        tableName: string,
        columns: string[],
        queryRunner: QueryRunner
    ) => {
        const table = await queryRunner.getTable(tableName);

        let foreignKeys = [];
        for (let foreign of columns) {
            const foreignKey = table.foreignKeys.find(
                fk => fk.columnNames.indexOf(foreign) !== -1
            );            
            foreignKeys.push(foreignKey);
        }

        for (let foreign of foreignKeys) {
            await queryRunner.dropForeignKey(table.name, foreign);
            await queryRunner.dropColumn(table.name, foreign.columnNames[0]);
        }

        await queryRunner.dropTable(table.name);
    }
}