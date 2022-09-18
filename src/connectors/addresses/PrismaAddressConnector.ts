import {injectable} from "inversify";
import {AddressConnector} from "./AddressConnector";
import {Address, AddressCreateRequest} from "./entities/Address";
import {DBClient} from "../../core/dbClient";

@injectable()
export class PrismaAddressConnector implements AddressConnector {

  async getById(id: string): Promise<Address | null> {
    console.log("bla", id)
    return DBClient.address.findFirst({
      where: {id},
    });
  }

  async update(_id: string, _update: Partial<Address>): Promise<Address> {
    return Promise.resolve<Address>({} as Address);
  }

  async create(addressCreateRequest: AddressCreateRequest): Promise<Address | null> {
    return DBClient.address.create({
      data: addressCreateRequest
    })
  }

  async getByAgencyId(agencyId: string): Promise<Address[] | null> {
    return DBClient.address.findMany({
      where: {
        agencyId,
      },
    })
  }
}
