import { t } from "elysia";
import { TransactionType } from "../enums/transaction.type";
import { TransactionRequestDto } from "../types/transaction.dto";

export const TransactionSchema = {
	type: "json",
	params: t.Object({
		id: t.Numeric(),
	}),
	body: TransactionRequestDto,
};

export const StatementSchema = {
	params: t.Object({
		id: t.Numeric(),
	}),
};
