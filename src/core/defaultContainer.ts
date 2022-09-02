import { Container } from "inversify";

import "../controllers/UserController";
import "../controllers/AgencyController";

// services
import { UserService } from "../services/UserService";
import { AgencyService } from "../services/AgencyService";

// connector types
import { UserConnector } from "../connectors/users/UserConnector";
import { AgencyConnector } from "../connectors/agencies/AgencyConnector";
import { AddressConnector } from "../connectors/addresses/AddressConnector";

// prisma connector classes
import { PrismaUserConnector } from "../connectors/users/PrismaUserConnector";
import { PrismaAgencyConnector } from "../connectors/agencies/PrismaAgencyConnector";
import { PrismaAddressConnector } from "../connectors/addresses/PrismaAddressConnector";

import { TYPES } from "./types";

export const container = new Container();

container.bind<UserService>(TYPES.UserServiceType).to(UserService);
container.bind<AgencyService>(TYPES.AgencyServiceType).to(AgencyService);

container.bind<UserConnector>(TYPES.UserConnectorType).to(PrismaUserConnector);
container.bind<AgencyConnector>(TYPES.AgencyConnectorType).to(PrismaAgencyConnector);
container.bind<AddressConnector>(TYPES.AddressConnectorType).to(PrismaAddressConnector);
