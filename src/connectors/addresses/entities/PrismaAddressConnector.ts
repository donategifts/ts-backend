import {injectable} from "inversify";
import {AddressConnector} from "../AddressConnector";
import {PrismaClient} from "@prisma/client";

@injectable()
export class PrismaAddressConnector implements AddressConnector {

	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

}
