import {injectable} from "inversify";
import {DBClient, DBClientType} from "../../core/dbClient";
import {EntryAlreadyExistsError} from "../../core/errors/EntryAlreadyExistsError";
import {User, UserCreateInput, UserUpdateInput} from "./entities/User";
import {UserConnector} from "./UserConnector";

@injectable()
export class PrismaUserConnector implements UserConnector {

  async getByEmail(email: string): Promise<User | null> {
    return DBClient.user.findUnique({
      where: {email},
    });
  }

  async create(user: UserCreateInput): Promise<User> {
    try {
      return await DBClient.user.create({
        data: user,
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

  async update(user: UserUpdateInput): Promise<User> {
    return DBClient.user.update({
      where: {
        email: user.email as string,
      },
      data: user,
    });
  }

}
