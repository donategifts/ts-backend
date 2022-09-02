export class EntryNotFoundError extends Error {
	public status: number;

	constructor(id: string) {
		super();
		this.message = `Entry with id ${id} does not exist`;
		this.status = 404;
	}
}
