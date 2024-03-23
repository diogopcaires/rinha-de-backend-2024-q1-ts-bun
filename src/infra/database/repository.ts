import type { Customer } from "../../types/customer";
import type { Transaction } from "../../types/transaction";
import type { TransactionType } from "../../enums/transaction.type";
import type { Statement } from "../../types/statement";
import { pool } from "./pool";
import { NotFoundError, UnprocessableContentError } from "../../enums/error";

async function fetchCustomer(
	customerId: number,
): Promise<Customer | undefined> {
	const client = await pool.connect();
	try {
		const result = await client.query("SELECT * FROM customers WHERE id = $1", [
			customerId,
		]);
		return result.rows[0];
	} finally {
		client.release();
	}
}

async function fetchCustomerTransactions(
	customerId: number,
	limit = 10,
): Promise<Transaction[] | undefined> {
	const client = await pool.connect();
	try {
		const result = await pool.query(
			"SELECT * FROM transactions WHERE customer_id = $1 ORDER BY ID DESC LIMIT $2",
			[customerId, limit],
		);
		return result.rows;
	} finally {
		client.release();
	}
}

async function customerStatement(
	customerId: number,
	limit = 10,
): Promise<Statement> {
	const client = await pool.connect();
	try {
		const query = "SELECT * FROM customer_statement($1,$2)";
		const result = await client.query(query, [customerId, limit]);

		return result.rows[0].customer_statement;
	} catch (err) {
		switch (err.message) {
			case "CUSTOMER_NOT_FOUND":
				throw new NotFoundError();
			default:
				throw err;
		}
	} finally {
		client.release();
	}
}

async function executeTransaction(
	customerId: number,
	transactionValue: number,
	type: TransactionType,
	description: string,
): Promise<{ balance: number; account_limit: number }> {
	const client = await pool.connect();
	try {
		const query = "SELECT * FROM execute_operation($1,$2,$3,$4)";
		const result = await client.query(query, [
			customerId,
			transactionValue,
			type,
			description,
		]);
		const { limit, balance } = result.rows[0].execute_operation;

		return { balance: balance, account_limit: limit };
	} catch (err) {
		switch (err.message) {
			case "CUSTOMER_NOT_FOUND":
				throw new NotFoundError();
			case "LIMIT_EXCEEDED":
				throw new UnprocessableContentError();
			default:
				throw err;
		}
	} finally {
		client.release();
	}
}

export default {
	fetchCustomer,
	fetchCustomerTransactions,
	executeTransaction,
	customerStatement,
};
