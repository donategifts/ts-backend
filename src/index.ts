import "reflect-metadata";
import {server} from "./core/server";

const port = process.env.PORT || 3000;

server.build().listen(parseInt(port as string), "0.0.0.0",() => console.log(`Listen on http://localhost:${port}/`));

