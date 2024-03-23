import { Pool } from "pg";

export const pool = new Pool({
	user: "rinha",
	host: "postgres",
	database: "rinha",
	password: "rinha",
	port: 5432,
});

async function connect() {
    try {
        log(`Connecting to db postgres`);
        await pool.connect();
    } catch (err) {
        setTimeout(() => {
            connect();
            log(`db: an error occured when connecting ${err} retrying connection on 3 secs`);
        }, 3000)
    }
}
