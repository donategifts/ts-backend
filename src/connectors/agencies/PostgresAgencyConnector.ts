import {AgencyConnector} from "./AgencyConnector";
import {Agency, AgencyCreateRequest} from "./entities/Agency";
import {PrismaClient} from "@prisma/client";
import {injectable} from "inversify";

@injectable()
export class PostgresAgencyConnector implements AgencyConnector {

	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

	async create(agencyCreateRequest: AgencyCreateRequest): Promise<Agency> {
		const {name, bio, createdBy, address, phone, website} = agencyCreateRequest;
			return this.prisma.agency.create({
				data: {
					name,
					bio,
					phone,
					website,
					creator: {
						connect: {uid: createdBy}
					},
					address: {
						create: {
							street: address.street,
							streetNumber: address.streetNumber,
							zipcode: address.zipcode,
							city: address.city,
							country: address.country,
							state: address.state
						}
					}
				},

			});
	}

	async getByCreatorId(id: string): Promise<Agency | null> {
		return this.prisma.agency.findFirst({
			where: {createdBy: id},
		});
	}

}
