import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
	UnprocessableContentError,
	ValidationError,
	NotFoundError,
} from "./enums/error";
import { getCustomerStatement } from "./services/statement.service";
import { seedDatabase, setupDML } from "./infra/database/config";
import ResponseBuilder from "./dto/response.builder";

setupDML();
seedDatabase();
const app = new Elysia()
	.error({
		UnprocessableContentError,
		ValidationError,
		NotFoundError,
	})
	.get("/healthcheck", async () => {
		const check = (sql: postgres.TransactionSql) =>
			sql.unsafe("SELECT 1 FROM clientes LIMIT 1");

		await Promise.all([roClient.begin(check), rwClient.begin(check)]);

		return "OK";
	})
	.group("/clientes/:id", (app) =>
		app
			.post("/transacoes", async ({ body, params, set }) => {})
			.get("/extrato", async ({ params }) => {
				const { id: idParam } = params as unknown;

				const id = Number(idParam);

				if (!Number.isInteger(id)) {
					throw new UnprocessableContentError("invalid customerId");
				}

				const { customer, customerTransactions } =
					await getCustomerStatement(id);

				return ResponseBuilder.buildStatementResponse(
					customer,
					customerTransactions,
				);
			}),
	)
	.onError(({ code, set }) => {
		if (code === "UnprocessableContentError") {
			set.status = 422;

			return "Not Found :(";
		}
	})
	.listen(Number(Bun.env.API_PORT || 3000));
