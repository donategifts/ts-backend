import {Container} from "inversify";

import "../controllers/UserController";
import "../controllers/AgencyController";
import "../controllers/CardController";
import "../controllers/IndexController";

// services
import {UserService} from "../services/UserService";
import {AgencyService} from "../services/AgencyService";
import {CardService} from "../services/CardService";

// connector types
import {UserConnector} from "../connectors/users/UserConnector";
import {AgencyConnector} from "../connectors/agencies/AgencyConnector";
import {AddressConnector} from "../connectors/addresses/AddressConnector";
import {CardConnector} from "../connectors/cards/CardConnector";

// prisma connector classes
import {PrismaUserConnector} from "../connectors/users/PrismaUserConnector";
import {PrismaAgencyConnector} from "../connectors/agencies/PrismaAgencyConnector";
import {PrismaAddressConnector} from "../connectors/addresses/PrismaAddressConnector";
import {PrismaCardConnector} from "../connectors/cards/PrismaCardConnector";

import {TYPES} from "./types";

export const container = new Container();

container.bind<UserService>(TYPES.UserServiceType).to(UserService);
container.bind<AgencyService>(TYPES.AgencyServiceType).to(AgencyService);
container.bind<CardService>(TYPES.CardServiceType).to(CardService);

container.bind<UserConnector>(TYPES.UserConnectorType).to(PrismaUserConnector);
container.bind<AgencyConnector>(TYPES.AgencyConnectorType).to(PrismaAgencyConnector);
container.bind<AddressConnector>(TYPES.AddressConnectorType).to(PrismaAddressConnector);
container.bind<CardConnector>(TYPES.CardConnectorType).to(PrismaCardConnector);
