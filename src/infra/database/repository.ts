import type { Customer } from "../../types/customer";
import type { Transaction } from "../../types/transaction";
import type { TransactionType } from "../../enums/transaction.type";
import { pool } from "./pool";

async function fetchCustomer(
	customerId: number,
): Promise<Customer | undefined> {
	const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
		customerId,
	]);
	return result.rows[0];
}

async function fetchCustomerTransactions(
	customerId: number,
	limit = 10,
): Promise<Transaction[] | undefined> {
	const result = await pool.query(
		"SELECT * FROM transactions WHERE customer_id = $1 ORDER BY ID DESC LIMIT $2",
		[customerId, limit],
	);

	return result.rows;
}

async function executeTransaction(
	customerId: number,
	newBalance: number,
	transactionValue: number,
	type: TransactionType,
	description: string,
) {
	await pool.query("UPDATE customers SET balance = $1 WHERE id = $2", [
		newBalance,
		customerId,
	]);

	await pool.query(
		"INSERT INTO transactions (customer_id, value, type, description) VALUES ($1, $2, $3, $4)",
		[customerId, transactionValue, type, description],
	);
}

export default {
	fetchCustomer,
	fetchCustomerTransactions,
	executeTransaction,
};
