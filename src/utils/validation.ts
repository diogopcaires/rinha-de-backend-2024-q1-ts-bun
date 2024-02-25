import { t } from "elysia";
import { TransactionType } from "../enums/transaction.type";

export const TransactionSchema = {
	params: t.Object({
		id: t.Numeric(),
	}),
	body: t.Object({
		valor: t.Number(),
		tipo: t.Enum(TransactionType),
		descricao: t.String({
			maxLength: 10,
			minLength: 1,
		}),
	}),
};

export const StatementSchema = {
	params: t.Object({
		id: t.Numeric(),
	}),
};
