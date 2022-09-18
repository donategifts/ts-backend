import "reflect-metadata";
import {server} from "./core/server";

const port = process.env.PORT || 3000;

server.build().listen(parseInt(port as string), () => console.log(`Listen on http://localhost:${port}/`));

