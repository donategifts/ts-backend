import {User, UserCreateInput} from "./entities/User";

export interface UserConnector {
	getByEmail(email: string): Promise<User | null>;
	create(user: UserCreateInput): Promise<User>;
}
