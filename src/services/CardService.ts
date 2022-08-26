import {inject, injectable} from "inversify";
import {TYPES} from "../core/types";
import {CardConnector} from "../connectors/cards/CardConnector";
import {Card, CardCreateInput} from "../connectors/cards/entities/Card";

@injectable()
export class CardService {

	constructor(
		@inject(TYPES.CardConnectorType) private readonly connector: CardConnector
	) {}

	async create(card: CardCreateInput): Promise<Card> {
		return this.connector.create(card);
	}
}
