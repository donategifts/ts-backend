import { inject, injectable } from "inversify";
import { UserConnector } from "../connectors/users/UserConnector";
import { TYPES } from "../core/types";
import { User, UserCreateInput, UserUpdateInput } from "../connectors/users/entities/User";

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserConnectorType) private readonly connector: UserConnector) {}

  async getByEmail(email: string): Promise<User | null> {
    return this.connector.getByEmail(email);
  }

  async create(user: UserCreateInput): Promise<User> {
    return this.connector.create(user);
  }

  async update(user: UserUpdateInput): Promise<User> {
    return this.connector.update(user);
  }
}
