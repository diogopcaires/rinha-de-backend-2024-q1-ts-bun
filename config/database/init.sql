CREATE UNLOGGED TABLE customers (
    id integer PRIMARY KEY NOT NULL,
    balance integer NOT NULL,
    account_limit integer NOT NULL
);

CREATE UNLOGGED TABLE transactions (
    id SERIAL PRIMARY KEY,
    value integer NOT NULL,
    description varchar(10) NOT NULL,
    type VARCHAR(1) NOT NULL,
    executed_at timestamp NOT NULL DEFAULT (NOW() at time zone 'utc'),
    customer_id integer NOT NULL
);

CREATE INDEX transaction_customer_index ON transactions (customer_id ASC);

INSERT INTO customers (id, account_limit, balance) VALUES
(1, 1000 * 100, 0),
(2, 800 * 100, 0),
(3, 10000 * 100, 0),
(4, 100000 * 100, 0),
(5, 5000 * 100, 0);
