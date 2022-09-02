import { injectable } from "inversify";
import { Prisma, PrismaClient } from "@prisma/client";
import { EntryAlreadyExistsError } from "../../core/errors/EntryAlreadyExistsError";
import { CardConnector } from "./CardConnector";
import { Card, CardCreateInput } from "./entities/Card";

@injectable()
export class PrismaCardConnector implements CardConnector {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

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
