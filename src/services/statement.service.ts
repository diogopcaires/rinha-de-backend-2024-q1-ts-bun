import Repository from "../infra/database/repository";
import { NotFoundError } from "../enums/error";
import type { Statement } from "../types/statement";

export async function getCustomerStatement(
	customerId: number,
): Promise<Statement> {
	const customer = await Repository.fetchCustomer(customerId);

	if (!customer) throw new NotFoundError();

	return await Repository.customerStatement(customerId);
}
