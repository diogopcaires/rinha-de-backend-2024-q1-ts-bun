import Repository from "../infra/database/repository";
import { NotFoundError } from "../enums/error";
import type { Customer } from "../types/customer";
import type { Transaction } from "../types/transaction";

export async function getCustomerStatement(
	customerId: number,
): Promise<{ customer: Customer; customerTransactions: [Transaction] }> {
	const customer = Repository.fetchCustomer(customerId);

	if (!customer) throw new NotFoundError("Customer not found");

	const customerTransactions = Repository.fetchCustomerTransactions(
		customer.id,
		10,
	);

	return {
		customer,
		customerTransactions,
	};
}
