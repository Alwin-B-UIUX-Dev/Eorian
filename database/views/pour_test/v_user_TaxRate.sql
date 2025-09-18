-- Active: 1753172327999@@127.0.0.1@5432@eorian_fr_db
CREATE OR REPLACE VIEW v_user_taxrate AS
SELECT
    id,
    name,
    rate,
    description,
    is_active,
    created_at,
    updated_at
FROM
    tax_rates
WHERE
    is_active = TRUE
ORDER BY
    name;


