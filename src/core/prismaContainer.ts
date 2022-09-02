import { Prisma, PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { TYPES } from "./types";

export { Prisma, PrismaClient };

export const container = new Container();
container.bind<PrismaClient>(TYPES.PrismaClientType).to(PrismaClient);
