import {Container} from "inversify";
import {TYPES} from "./types";

import "../controllers/UserController";
import "../controllers/AgencyController";

import {UserService} from "../services/UserService";
import {UserConnector} from "../connectors/users/UserConnector";
import {PrismaUserConnector} from "../connectors/users/PrismaUserConnector";
import {AgencyService} from "../services/AgencyService";
import {AgencyConnector} from "../connectors/agencies/AgencyConnector";
import {PrismaAgencyConnector} from "../connectors/agencies/PrismaAgencyConnector";

export const container = new Container();
container.bind<UserService>(TYPES.UserServiceType).to(UserService);
container.bind<UserConnector>(TYPES.UserConnectorType).to(PrismaUserConnector);
container.bind<AgencyService>(TYPES.AgencyServiceType).to(AgencyService);
container.bind<AgencyConnector>(TYPES.AgencyConnectorType).to(PrismaAgencyConnector);
