import Repository from "../infra/database/repository";
import { NotFoundError, UnprocessableContentError } from "../enums/error";
import { TransactionType } from "../enums/transaction.type";

export async function executeTransaction(
	customerId: number,
	value: number,
	type: TransactionType,
	description: string,
): Promise<{ balance: number; account_limit: number }> {

	const {balance, account_limit} = await Repository.executeTransaction(
		customerId,
		value,
		type,
		description,
	);

	return {
		balance,
		account_limit,
	};
}
