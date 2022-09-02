import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { AddressConnector } from "../AddressConnector";

@injectable()
export class PrismaAddressConnector implements AddressConnector {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
}
