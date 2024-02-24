export type Transaction = {
	id: number;
	customer_id: number;
	value: number;
	transaction_type: string;
	description: string;
	transaction_at: number;
};
