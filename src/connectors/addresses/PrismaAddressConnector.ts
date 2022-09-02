import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { TYPES } from "../../core/types";
import { AddressConnector } from "./AddressConnector";
import { Address } from "./entities/Address";

@injectable()
export class PrismaAddressConnector implements AddressConnector {
	constructor(@inject(TYPES.PrismaClientType) private readonly prisma: PrismaClient) {}

	async update(_id: string, _update: Partial<Address>): Promise<Address> {
		// TODO: implement
		return Promise.resolve<Address>({} as Address);
	}
}
