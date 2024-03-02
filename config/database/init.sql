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



CREATE OR REPLACE FUNCTION execute_operation(
    p_customer_id INT,
    p_value INT,
    p_type varchar(1),
    p_description TEXT
) RETURNS JSON AS $$
DECLARE
    v_balance NUMERIC;
    v_account_limit INT;
    variation INT;
BEGIN
    -- Check if client exists
    IF NOT EXISTS (SELECT 1 FROM customers WHERE id = p_customer_id) THEN
        RAISE EXCEPTION 'CUSTOMER_NOT_FOUND';
    END IF;

    -- Start a transaction block
    BEGIN
        -- Fetch customer's balance and limit
        SELECT balance, account_limit
        INTO v_balance, v_account_limit
        FROM customers
        WHERE id = p_customer_id
        FOR UPDATE;

        IF p_type = 'd' THEN
            variation := p_value * -1;
        ELSE
            variation := p_value;
        END IF;

        -- Check if debit exceeds limit
        IF (v_balance + variation) < (v_account_limit * -1) THEN
            RAISE EXCEPTION 'LIMIT_EXCEEDED';
        END IF;
        
        -- Create transaction
        INSERT INTO transactions (customer_id, value, type, description)
        VALUES (p_customer_id, p_value, p_type, p_description);

        -- Update client's balance
        UPDATE customers
        SET balance = 
        CASE
            WHEN p_type = 'c' THEN balance + p_value
            WHEN p_type = 'd' THEN balance - p_value
        END
        WHERE id = p_customer_id;

        -- Commit the transaction
    EXCEPTION
        WHEN OTHERS THEN
            -- Re-raise the error
            RAISE;
    END;
    -- Return updated client data
    RETURN (SELECT json_build_object(
        'balance', balance,
        'limit', account_limit
    ) FROM customers WHERE id = p_customer_id);
END;
$$ LANGUAGE plpgsql;



INSERT INTO customers (id, account_limit, balance) VALUES
(1, 1000 * 100, 0),
(2, 800 * 100, 0),
(3, 10000 * 100, 0),
(4, 100000 * 100, 0),
(5, 5000 * 100, 0);