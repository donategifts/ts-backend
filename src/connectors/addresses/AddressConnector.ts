import {Address, AddressCreateRequest} from "./entities/Address";

export interface AddressConnector {
  getById(id: string): Promise<Address | null>
  create(addressCreateRequest: AddressCreateRequest): Promise<Address | null>
  update(id: string, update: Partial<Address>): Promise<Address>;
  getByAgencyId(agencyId: string):Promise<Address[] | null>;
}
