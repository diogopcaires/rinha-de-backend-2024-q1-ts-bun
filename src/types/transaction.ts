export type Transaction = {
	id: number;
	customer_id: number;
	value: number;
	type: string;
	description: string;
	executed_at: number;
};
