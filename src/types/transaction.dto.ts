import { t } from "elysia";
import { TransactionType } from "../enums/transaction.type";

export const TransactionRequestDto = t.Object({
	valor: t.Number(),
	tipo: t.Enum(TransactionType),
	descricao: t.String({
		maxLength: 10,
		minLength: 1,
	}),
});

export type TransactionResponseDto = {
	limite: number;
	saldo: number;
};
