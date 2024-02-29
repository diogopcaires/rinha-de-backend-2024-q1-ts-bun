import Repository from "../infra/database/repository";
import { NotFoundError, UnprocessableContentError } from "../enums/error";
import { TransactionType } from "../enums/transaction.type";

export async function executeTransaction(
	customerId: number,
	value: number,
	type: TransactionType,
	description: string,
): Promise<{ balance: number; account_limit: number }> {
	const customer = await Repository.fetchCustomer(customerId);

	if (!customer) throw new NotFoundError();

	const newBalance =
		customer.balance + (type === TransactionType.CREDIT ? value : -value);

	if (newBalance < -customer.account_limit)
		throw new UnprocessableContentError();

	await Repository.executeTransaction(
		customer.id,
		newBalance,
		value,
		type,
		description,
	);

	return {
		balance: newBalance,
		account_limit: customer.account_limit,
	};
}
