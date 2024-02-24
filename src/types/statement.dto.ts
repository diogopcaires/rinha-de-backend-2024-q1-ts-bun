export type Balance = {
	total: number;
	data_extrato: string;
	limite: number;
};

export type TransactionsResponseDto = {
	valor: number;
	tipo: string;
	descricao: string;
	realizada_em: number;
};

export type StatementResponseDto = {
	saldo: Balance;
	ultimas_transacoes: TransactionsResponseDto[];
};
