import {inject, injectable} from "inversify";
import {TYPES} from "../core/types";
import {AddressConnector} from "../connectors/addresses/AddressConnector";

@injectable()
export class AddressService {

  constructor(@inject(TYPES.AddressConnectorType) private readonly connector: AddressConnector) {}

}
