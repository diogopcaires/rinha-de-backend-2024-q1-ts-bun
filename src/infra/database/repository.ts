import { Database } from "bun:sqlite";
import type { Customer } from "../../types/customer";
import type { Transaction } from "../../types/transaction";
import type { TransactionType } from "../../enums/transaction.type";

const db = new Database("./data/database.SQLite3");

function fetchCustomer(clientId: number): Customer {
	const query = db.prepare("SELECT * FROM customers WHERE id = ?");
	const customer = query.get(clientId) as Customer;
	query.finalize();
	return customer;
}

function fetchCustomerTransactions(
	customerId: number,
	limit = 10,
): [Transaction] {
	const query = db.prepare(
		"SELECT * FROM transactions WHERE customer_id = ? ORDER BY ID DESC LIMIT ?",
	);
	const transactions = query.all(customerId, limit) as [Transaction];
	query.finalize();
	console.log(transactions);
	return transactions;
}

function executeTransaction(
	customerId: number,
	newBalance: number,
	transactionValue: number,
	type: TransactionType,
	description: string,
) {
	// let query =
	// 	db.prepare(`INSERT INTO transactions (customer_id, value, type, description) VALUES (${customerId}, ${transactionValue}, '${type}', '${description}');
	// 						  UPDATE customers SET balance = ${newBalance} WHERE id = ${customerId};`);

	// query.finalize();

	let query = db.prepare("UPDATE customers SET balance = ? WHERE id = ?");

	query.run(newBalance, customerId);

	query.finalize();

	query = db.prepare(
		"INSERT INTO transactions (customer_id, value, type, description) VALUES (?, ?, ?, ?)",
	);
	query.run(customerId, transactionValue, type, description);
	query.finalize();
}

export default {
	fetchCustomer,
	fetchCustomerTransactions,
	executeTransaction,
};
