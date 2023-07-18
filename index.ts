require("dotenv").config({ path: __dirname + "/.env.example", debug: true });

import { createServer } from "./server";

createServer();
