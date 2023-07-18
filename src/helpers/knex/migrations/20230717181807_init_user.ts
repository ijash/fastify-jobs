import { Knex } from "knex";

const TABLENAME = "user";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLENAME, (table) => {
    table.string("id", 50).primary();
    // table.string("name", 100);
    // table.string("email", 100);
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLENAME);
}
