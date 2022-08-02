import {Container} from "inversify";
import {UserService} from "../services/users/UserService";
import {TYPES} from "./types";

import "../controllers/UserController";
import "../controllers/AgencyController";

import {UserConnector} from "../connectors/users/UserConnector";
import {PostgresUserConnector} from "../connectors/users/PostgresUserConnector";
import {AgencyService} from "../services/agencies/AgencyService";
import {AgencyConnector} from "../connectors/agencies/AgencyConnector";
import {PostgresAgencyConnector} from "../connectors/agencies/PostgresAgencyConnector";

export const container = new Container();
container.bind<UserService>(TYPES.UserServiceType).to(UserService);
container.bind<UserConnector>(TYPES.UserConnectorType).to(PostgresUserConnector);
container.bind<AgencyService>(TYPES.AgencyServiceType).to(AgencyService);
container.bind<AgencyConnector>(TYPES.AgencyConnectorType).to(PostgresAgencyConnector);
