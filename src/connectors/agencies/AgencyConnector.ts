import {Agency, AgencyCreateRequest} from "./entities/Agency";

export interface AgencyConnector {
	getByCreatorId(id: string): Promise<Agency | null>;
	create(agencyCreateRequest: AgencyCreateRequest): Promise<Agency>;
}
