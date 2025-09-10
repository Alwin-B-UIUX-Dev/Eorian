CREATE OR REPLACE VIEW vw_tax_rates_active AS
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


