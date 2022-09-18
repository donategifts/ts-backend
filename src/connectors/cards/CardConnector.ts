import {Card} from "./entities/Card";
import {ChildCardCreateInput} from "./entities/ChildCard";

export interface CardConnector {
  create(creator: string, agencyId: string, addressId: string, card: ChildCardCreateInput): Promise<Card>;
}
