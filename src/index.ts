import "reflect-metadata";
import {server} from "./core/server";

const port = 3000;

server.build().listen(port, () => console.log(`Listen on http://localhost:${port}/`));
