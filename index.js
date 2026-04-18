import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import { bootstrap } from "./app.controllers.js";

bootstrap();
