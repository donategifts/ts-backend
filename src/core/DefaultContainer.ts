import {Container} from "inversify";
import {UserService} from "../services/users/UserService";
import {TYPES} from "./types";

import "../controllers/UserController";
import {UserConnector} from "../connectors/users/UserConnector";
import {PostgresUserConnector} from "../connectors/users/PostgresUserConnector";

export const container = new Container();
container.bind<UserService>(TYPES.UserServiceType).to(UserService);
container.bind<UserConnector>(TYPES.UserConnectorType).to(PostgresUserConnector);
