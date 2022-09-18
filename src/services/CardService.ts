import {inject, injectable} from "inversify";
import {TYPES} from "../core/types";
import {CardConnector} from "../connectors/cards/CardConnector";
import {Card} from "../connectors/cards/entities/Card";
import {ChildCardCreateInput} from "../connectors/cards/entities/ChildCard";

@injectable()
export class CardService {

  constructor(@inject(TYPES.CardConnectorType) private readonly connector: CardConnector) {}

  async create(creator: string, agencyId: string, addressId: string, card: ChildCardCreateInput): Promise<Card> {
    return this.connector.create(creator, agencyId, addressId, card);
  }

}
