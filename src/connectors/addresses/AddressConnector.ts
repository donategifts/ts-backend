import {Address} from "./entities/Address";

export interface AddressConnector {
  update(id: string, update: Partial<Address>): Promise<Address>;
}
