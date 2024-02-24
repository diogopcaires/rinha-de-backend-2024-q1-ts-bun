import type { Customer } from "../types/customer";
import type { StatementResponseDto } from "../types/statement.dto";
import type { Transaction } from "../types/transaction";

function buildStatementResponse(
	customer: Customer,
	transactions: [Transaction],
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
				tipo: t.transaction_type,
				descricao: t.description,
				realizada_em: t.transaction_at,
			};
		}),
	};
}

export default {
	buildStatementResponse,
};
