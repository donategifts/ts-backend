import {injectable} from "inversify";
import {DBClient, DBClientType} from "../../core/dbClient";
import {EntryAlreadyExistsError} from "../../core/errors/EntryAlreadyExistsError";
import {CardConnector} from "./CardConnector";
import {Card, CardImageCreateInput} from "./entities/Card";
import {ChildCardCreateInput} from "./entities/ChildCard";

@injectable()
export class PrismaCardConnector implements CardConnector {

  async create(creatorId: string, agencyId: string, addressId: string, cardCreateInput: ChildCardCreateInput): Promise<Card> {
    try {
      const images = cardCreateInput.images as CardImageCreateInput || [];
      return await DBClient.card.create({
        data: {
          type: cardCreateInput.type,
          status: cardCreateInput.status,
          itemUrl: cardCreateInput.itemUrl,
          itemPrice: cardCreateInput.itemPrice,
          images: {
            create: images
          },
          creator: {
            connect: {uid: creatorId},
          },
          agency: {
            connect: {id: agencyId},
          },
          address: {
            connect: {id: addressId}
          },
          childCard: {
            create: {
              birthday: cardCreateInput.birthday,
              bio: cardCreateInput.bio,
              firstName: cardCreateInput.firstName,
              interest: cardCreateInput.interest,
              gender: cardCreateInput.gender,
              lastName: cardCreateInput.lastName,
            }
          }
        },
        include: {
          childCard: true,
          images: true
        }
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
