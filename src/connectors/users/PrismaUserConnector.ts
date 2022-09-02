import { inject, injectable } from "inversify";
import { Prisma, PrismaClient } from "../../core/prismaContainer";
import { EntryAlreadyExistsError } from "../../core/errors/EntryAlreadyExistsError";
import { TYPES } from "../../core/types";
import { User, UserCreateInput, UserUpdateInput } from "./entities/User";
import { UserConnector } from "./UserConnector";

@injectable()
export class PrismaUserConnector implements UserConnector {
	constructor(@inject(TYPES.PrismaClientType) private readonly prisma: PrismaClient) {}

	async getByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}

	async create(user: UserCreateInput): Promise<User> {
		try {
			return await this.prisma.user.create({
				data: user,
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

	async update(user: UserUpdateInput): Promise<User> {
		return this.prisma.user.update({
			where: {
				email: user.email as string,
			},
			data: user,
		});
	}
}
