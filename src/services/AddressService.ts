import {inject, injectable} from "inversify";
import {TYPES} from "../core/types";
import {AddressConnector} from "../connectors/addresses/AddressConnector";
import { Address } from "@prisma/client";
import { AddressCreateRequest } from "../connectors/addresses/entities/Address";

@injectable()
export class AddressService {

  constructor(@inject(TYPES.AddressConnectorType) private readonly connector: AddressConnector) {}

  async getById(id: string): Promise<Address | null> {
    return this.connector.getById(id);
  }

  async create(addressCreateRequest: AddressCreateRequest): Promise<Address | null> {
    return this.connector.create(addressCreateRequest);
  }

  async getByAgency(agencyId: string): Promise<Address[] | null> {
    return this.connector.getByAgencyId(agencyId);
  }
}
