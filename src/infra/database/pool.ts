import { Pool } from "pg";

export const pool = new Pool({
	user: "rinha",
	host: "postgres",
	database: "rinha",
	password: "rinha",
	port: 5432,
});
