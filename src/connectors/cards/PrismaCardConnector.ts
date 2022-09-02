import {inject, injectable} from "inversify";
import {Prisma, PrismaClient} from "../../core/prismaContainer";
import {EntryAlreadyExistsError} from "../../core/errors/EntryAlreadyExistsError";
import {TYPES} from "../../core/types";
import {CardConnector} from "./CardConnector";
import {Card, CardCreateInput} from "./entities/Card";

@injectable()
export class PrismaCardConnector implements CardConnector {

  constructor(@inject(TYPES.PrismaClientType) private readonly prisma: PrismaClient) {}

  async create(card: CardCreateInput): Promise<Card> {
    try {
      return await this.prisma.card.create({
        data: card,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002" && error.meta) {
          const target = error.meta.target as string[];
          throw new EntryAlreadyExistsError(target[0]);
        }
      }
      throw error;
    }
  }

}
