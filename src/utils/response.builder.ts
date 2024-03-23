import type { Statement } from "../types/statement";
import type { StatementResponseDto } from "../types/statement.dto";
import type { TransactionResponseDto } from "../types/transaction.dto";

function buildStatementResponse(statement: Statement): StatementResponseDto {
	const { balance, lastTransactions } = statement;

	return {
		saldo: {
			total: balance.total,
			limite: balance.limit,
			data_extrato: new Date().toISOString(),
		},
		ultimas_transacoes: lastTransactions.map((t) => {
			return {
				valor: t.value,
				tipo: t.type,
				descricao: t.description,
				realizada_em: t.executedAt,
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
