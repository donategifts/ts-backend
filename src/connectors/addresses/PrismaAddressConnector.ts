import {injectable} from "inversify";
import {AddressConnector} from "./AddressConnector";
import {Address} from "./entities/Address";

@injectable()
export class PrismaAddressConnector implements AddressConnector {

  async update(_id: string, _update: Partial<Address>): Promise<Address> {
    // TODO: implement
    return Promise.resolve<Address>({} as Address);
  }

}
