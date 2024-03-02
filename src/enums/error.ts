export class UnprocessableContentError extends Error {
	code = "UNPROCESSABLE_CONTENT_ERROR";
	status = 422;

	constructor() {
		super("UNPROCESSABLE_CONTENT_ERROR");
	}
}

export class ValidationError extends Error {
	code = "VALIDATION";
	status = 422;

	constructor() {
		super("VALIDATION");
	}
}

export class NotFoundError extends Error {
	code = "NOT_FOUND";
	status = 404;

	constructor() {
		super("NOT_FOUND");
	}
}

export class ServerError extends Error {
	code = "SERVER_ERROR";
	status = 500;

	constructor() {
		super("SERVER_ERROR");
	}
}

