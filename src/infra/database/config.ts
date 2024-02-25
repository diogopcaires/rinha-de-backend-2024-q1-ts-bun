import { Database } from "bun:sqlite";

const db = new Database("./data/database.SQLite3");

export function setupDML() {
	db.exec("PRAGMA journal_mode = WAL;");
	db.exec("PRAGMA threads = 4;");
	db.exec("PRAGMA busy_timeout = 30000;");
	db.exec("PRAGMA temp_store = MEMORY;");
	db.exec("PRAGMA cache_size = 10000;");
	db.exec("PRAGMA auto_vacuum = FULL;");
	db.exec("PRAGMA automatic_indexing = TRUE;");
	db.exec("PRAGMA count_changes = FALSE;");
	db.exec('PRAGMA encoding = "UTF-8";');
	db.exec("PRAGMA ignore_check_constraints = TRUE;");
	db.exec("PRAGMA incremental_vacuum = 0;");
	db.exec("PRAGMA legacy_file_format = FALSE;");
	db.exec("PRAGMA optimize = On;");
	db.exec("PRAGMA synchronous = NORMAL;");

	db.exec(`DROP TABLE IF EXISTS customers`);
	db.exec(`DROP TABLE IF EXISTS transactions`);

	db.exec(`CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        account_limit INTEGER,
        balance INTEGER DEFAULT 0
    )`);

	db.exec(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        value INTEGER,
        type TEXT,
        description TEXT,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
}

export function seedDatabase() {
	db.exec(`INSERT INTO customers (name, account_limit) VALUES
            ('o barato sai caro', 1000 * 100),
            ('zan corp ltda', 800 * 100),
            ('les cruders', 10000 * 100),
            ('padaria joia de cocaia', 100000 * 100),
            ('kid mais', 5000 * 100)`);
}
