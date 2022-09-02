export class EntryAlreadyExistsError extends Error {
	public status: number;

	constructor(field: string) {
		super();
		this.message = `Entry with field ${field} already exists`;
		this.status = 409;
	}
}
