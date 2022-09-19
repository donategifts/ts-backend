import {inject, injectable} from "inversify";
import {TYPES} from "../core/types";
import {AgencyConnector} from "../connectors/agencies/AgencyConnector";
import {Agency, AgencyCreateRequest} from "../connectors/agencies/entities/Agency";
import {AddressService} from "./AddressService";

@injectable()
export class AgencyService {

  constructor(
    @inject(TYPES.AgencyConnectorType) private readonly connector: AgencyConnector,
    @inject(TYPES.AddressServiceType) private readonly addressService: AddressService
  ) {}

  async getByCreatorId(id: string): Promise<Agency | null> {
    return this.connector.getByCreatorId(id);
  }

  async create(agencyCreateRequest: AgencyCreateRequest): Promise<Agency> {
    const agency = await this.connector.create(agencyCreateRequest);
    if (agencyCreateRequest.address) {
      agencyCreateRequest.address.agencyId = agency.id;
      await this.addressService.create(agencyCreateRequest.address);
    }
    return agency;
  }

  async verify(id: string): Promise<Agency> {
    return this.connector.update(id, {isVerified: true});
  }

}
