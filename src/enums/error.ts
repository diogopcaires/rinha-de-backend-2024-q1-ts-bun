export enum HttpStatusCode {
	NOT_FOUND = 404,
	UNPROCESSABLE_CONTENT = 422,
}

export class UnprocessableContentError extends Error {
	constructor(public message: string) {
		super(message);
	}
}

export class ValidationError extends Error {
	constructor(public message: string) {
		super(message);
	}
}

export class NotFoundError extends Error {
	constructor(public message: string) {
		super(message);
	}
}
