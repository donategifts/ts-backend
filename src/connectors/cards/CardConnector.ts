import {Card, CardCreateInput} from "./entities/Card";

export interface CardConnector {
	create(card: CardCreateInput): Promise<Card>;
}
