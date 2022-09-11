import {injectable} from "inversify";
import {EntryNotFoundError} from "../../core/errors/EntryNotFoundError";
import {Agency, AgencyCreateRequest} from "./entities/Agency";
import {AgencyConnector} from "./AgencyConnector";
import {DBClient, DBClientType} from "../../core/dbClient";

@injectable()
export class PrismaAgencyConnector implements AgencyConnector {

  async create(agencyCreateRequest: AgencyCreateRequest): Promise<Agency> {
    const {name, bio, createdBy, address, phone, website} = agencyCreateRequest;
    return DBClient.agency.create({
      data: {
        name,
        bio,
        phone,
        website,
        creator: {
          connect: {uid: createdBy},
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
    return DBClient.agency.findFirst({
      where: {createdBy: id},
    });
  }

  async update(id: string, update: Partial<Agency>): Promise<Agency> {
    try {
      return await DBClient.agency.update({
        where: {id},
        data: update,
      });
    } catch (error) {
      if (error instanceof DBClientType.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new EntryNotFoundError(id);
        }
      }
      throw error;
    }
  }

}
