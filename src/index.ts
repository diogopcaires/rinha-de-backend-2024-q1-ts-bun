import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

import {
	UnprocessableContentError,
	ValidationError,
	NotFoundError,
} from "./enums/error";
import { getCustomerStatement } from "./services/statement.service";
import { seedDatabase, setupDML } from "./infra/database/config";
import ResponseBuilder from "./utils/response.builder";
import { StatementSchema, TransactionSchema } from "./utils/validation";

setupDML();
seedDatabase();
const app = new Elysia()
	.error({
		UnprocessableContentError,
		ValidationError,
		NotFoundError,
	})
	.get("/healthcheck", async () => {})
	.group("/clientes/:id", (app) =>
		app
			.post(
				"/transacoes",
				async ({ body, params, set }) => {},
				TransactionSchema,
			)

			.get(
				"/extrato",
				async ({ params }) => {
					const { id } = params as unknown;

					const { customer, customerTransactions } =
						await getCustomerStatement(id);

					return ResponseBuilder.buildStatementResponse(
						customer,
						customerTransactions,
					);
				},
				StatementSchema,
			),
	)
	.onError(({ code, set }) => {
		console.log("adassa");
		switch (code) {
			case "UnprocessableContentError": {
				set.status = 422;
				return "unprocessable content";
			}
			case "VALIDATION": {
				set.status = 422;
				return "input invalid";
			}
			case "NotFoundError": {
				set.status = 404;
				return "entity not found";
			}
		}
	})
	.listen(Number(Bun.env.API_PORT || 3000));
