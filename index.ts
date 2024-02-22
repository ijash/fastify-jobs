require("dotenv").config({ path: __dirname + "/.env", debug: true });

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);

import { createServer } from "./server";

createServer();
