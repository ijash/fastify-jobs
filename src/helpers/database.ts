import knex from "knex";

export default knex({
  client: `pg`,
  //   pool: { min: 0, max: 10 },
  //   debug: false,
  connection: {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
  },
});
