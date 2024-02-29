import type { Customer } from "../types/customer";
import type { StatementResponseDto } from "../types/statement.dto";
import type { Transaction } from "../types/transaction";
import type { TransactionResponseDto } from "../types/transaction.dto";

function buildStatementResponse(
	customer: Customer,
	transactions: Transaction[],
): StatementResponseDto {
	const { account_limit, balance } = customer;

	return {
		saldo: {
			total: balance,
			limite: account_limit,
			data_extrato: new Date().toISOString(),
		},
		ultimas_transacoes: transactions.map((t) => {
			return {
				valor: t.value,
				tipo: t.type,
				descricao: t.description,
				realizada_em: t.executed_at,
			};
		}),
	};
}

function buildTransactionResponse(
	newBalance: number,
	accountLimit: number,
): TransactionResponseDto {
	return {
		limite: accountLimit,
		saldo: newBalance,
	};
}

export default {
	buildStatementResponse,
	buildTransactionResponse,
};
