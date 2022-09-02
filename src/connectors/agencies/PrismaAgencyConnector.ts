import { Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { EntryNotFoundError } from "../../core/errors/EntryNotFoundError";
import { Agency, AgencyCreateRequest } from "./entities/Agency";
import { AgencyConnector } from "./AgencyConnector";

@injectable()
export class PrismaAgencyConnector implements AgencyConnector {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

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
