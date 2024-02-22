import knex from "knex";
import { TYPES } from "tedious";

export default knex({
  client: "mssql",
  connection: {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    options: {
      mapBinding: (value) => {
        // bind all strings to varchar instead of nvarchar
        if (typeof value === "string") {
          return {
            type: TYPES.VarChar,
            value,
          };
        }
        // allow devs to pass tedious type at query time
        if (value != null && value.type) {
          return {
            type: value.type,
            value: value.value,
          };
        }
        // undefined is returned; falling back to default mapping function
      },
    },
  },
});
