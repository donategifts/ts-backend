import {UserConnector} from "./UserConnector";
import {injectable} from "inversify";
import {PrismaClient} from "@prisma/client";
import {User, UserCreateInput} from "./entities/User";

@injectable()
export  class PostgresUserConnector implements UserConnector{

	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

	async getByEmail(email: string): Promise<User | null> {
				return this.prisma.user.findUnique({
					where: {email}
				});
    }

		async create(user: UserCreateInput): Promise<User> {
			return this.prisma.user.create({
				data: user
			});
		}

}
