import {injectable} from "inversify";
import {DBClient, DBClientType} from "../../core/dbClient";
import {EntryAlreadyExistsError} from "../../core/errors/EntryAlreadyExistsError";
import {CardConnector} from "./CardConnector";
import {Card, CardCreateInput} from "./entities/Card";

@injectable()
export class PrismaCardConnector implements CardConnector {

  async create(card: CardCreateInput): Promise<Card> {
    try {
      return await DBClient.card.create({
        data: card,
      });
    } catch (error) {
      if (error instanceof DBClientType.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta) {
          const target = error.meta.target as string[];
          throw new EntryAlreadyExistsError(target[0]);
        }
      }
      throw error;
    }
  }

}
