export type Balance = {
	total: number;
	statementDate: string;
	limit: number;
};

export type Transaction = {
	value: number;
	type: string;
	description: string;
	executedAt: number;
};

export type Statement = {
	balance: Balance;
	lastTransactions: Transaction[];
};
