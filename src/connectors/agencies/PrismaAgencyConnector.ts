import { inject, injectable } from "inversify";
import { Prisma, PrismaClient } from "../../core/prismaContainer";
import { EntryNotFoundError } from "../../core/errors/EntryNotFoundError";
import { TYPES } from "../../core/types";
import { Agency, AgencyCreateRequest } from "./entities/Agency";
import { AgencyConnector } from "./AgencyConnector";

@injectable()
export class PrismaAgencyConnector implements AgencyConnector {
	constructor(@inject(TYPES.PrismaClientType) private readonly prisma: PrismaClient) {}

	async create(agencyCreateRequest: AgencyCreateRequest): Promise<Agency> {
		const { name, bio, createdBy, address, phone, website } = agencyCreateRequest;
		return this.prisma.agency.create({
			data: {
				name,
				bio,
				phone,
				website,
				creator: {
					connect: { uid: createdBy },
				},
				address: {
					create: {
						street: address.street,
						streetNumber: address.streetNumber,
						zipcode: address.zipcode,
						city: address.city,
						country: address.country,
						state: address.state,
					},
				},
			},
		});
	}

	async getByCreatorId(id: string): Promise<Agency | null> {
		return this.prisma.agency.findFirst({
			where: { createdBy: id },
		});
	}

	async update(id: string, update: Partial<Agency>): Promise<Agency> {
		try {
			return await this.prisma.agency.update({
				where: { id },
				data: update,
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2025") {
					throw new EntryNotFoundError(id);
				}
			}
			throw error;
		}
	}
}
