import {inject, injectable} from "inversify";
import {TYPES} from "../../core/types";
import {AgencyConnector} from "../../connectors/agencies/AgencyConnector";
import {Agency, AgencyCreateRequest} from "../../connectors/agencies/entities/Agency";

@injectable()
export class AgencyService {

	constructor(
		@inject(TYPES.AgencyConnectorType) private readonly connector: AgencyConnector
	) {}

	async getByCreatorId(id: string): Promise<Agency | null> {
		return this.connector.getByCreatorId(id);
	}

	async create(agencyCreateRequest: AgencyCreateRequest): Promise<Agency> {
		return this.connector.create(agencyCreateRequest);
	}

}
