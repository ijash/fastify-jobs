import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env.example" });

export default {
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
  },
  migrations: {
    directory: "./src/helpers/knex/migrations",
    tableName: "__knex_migrations",
  },
  seeds: {
    directory: "knex/seeds",
  },
};
