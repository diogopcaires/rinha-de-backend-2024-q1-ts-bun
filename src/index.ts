import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

import {
	UnprocessableContentError,
	ValidationError,
	NotFoundError,
} from "./enums/error";
import { getCustomerStatement } from "./services/statement.service";
import ResponseBuilder from "./utils/response.builder";
import { StatementSchema, TransactionSchema } from "./utils/validation";
import { executeTransaction } from "./services/transaction.service";

const app = new Elysia()
	.error({
		UNPROCESSABLE_CONTENT_ERROR: UnprocessableContentError,
		VALIDATION_ERROR: ValidationError,
		NOT_FOUND_ERROR: NotFoundError,
	})
	.get("/healthcheck", async () => {})
	.group("/clientes/:id", (app) =>
		app
			.post(
				"/transacoes",
				async ({ body, params, set }) => {
					const { id } = params;
					const { valor, tipo, descricao } = body;

					const { balance, account_limit } = await executeTransaction(
						id,
						valor,
						tipo,
						descricao,
					);

					return ResponseBuilder.buildTransactionResponse(
						balance,
						account_limit,
					);
				},
				TransactionSchema,
			)

			.get(
				"/extrato",
				async ({ params }) => {
					const { id } = params as { id: number };

					const customerStatement = await getCustomerStatement(id);

					return ResponseBuilder.buildStatementResponse(customerStatement);
				},
				StatementSchema,
			),
	)
	.onError(({ code, error, set }) => {
		console.log(error);
		switch (code) {
			case "UNPROCESSABLE_CONTENT_ERROR": {
				set.status = 422;
				return "unprocessable content";
			}
			case "VALIDATION": {
				set.status = 422;
				return "input invalid";
			}
			case "NOT_FOUND_ERROR": {
				set.status = 404;
				return "entity not found";
			}
		}
	})
	.listen(Number(Bun.env.API_PORT || 3000));
