import { Database } from "bun:sqlite";
import type { Customer } from "../../types/customer";
import type { Transaction } from "../../types/transaction";

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
	return transactions;
}

export default {
	fetchCustomer,
	fetchCustomerTransactions,
};
