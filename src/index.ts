import "reflect-metadata";
import {server} from "./core/server";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
server.build().listen(parseInt(port as string), host, () => console.log(`Listen on http://localhost:${port}/`));

