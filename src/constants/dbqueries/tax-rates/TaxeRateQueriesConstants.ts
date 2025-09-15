export class TaxeRateQueriesConstants {
  public static readonly INSERT_TAXE_RATE: string = /*sql*/ `
    INSERT INTO tax_rates (name, rate, description, is_active)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

  public static readonly SELECT_TAXE_RATE_BY_ID: string = /*sql*/ `
    SELECT id, name, rate, description, is_active, created_at, updated_at
    FROM tax_rates
    WHERE id = $1
  `;

  public static readonly SELECT_TAXE_RATE_BY_NAME: string = /*sql*/ `
    SELECT id, name, rate, description, is_active, created_at, updated_at
    FROM tax_rates
    WHERE name = $1
  `;

  public static readonly SELECT_TAXE_RATES_BY_ACTIVE: string = /*sql*/ `
    SELECT id, name, rate, description, is_active, created_at, updated_at
    FROM tax_rates
    WHERE is_active = $1
    ORDER BY name ASC
  `;

  public static readonly SELECT_ALL_TAXE_RATES: string = /*sql*/ `
    SELECT id, name, rate, description, is_active, created_at, updated_at
    FROM tax_rates
    ORDER BY name ASC
    LIMIT $1 OFFSET $2
  `;

  public static readonly UPDATE_TAXE_RATE: string = /*sql*/ `
    UPDATE tax_rates
    SET name = COALESCE($2, name),
        rate = COALESCE($3, rate),
        description = COALESCE($4, description),
        is_active = COALESCE($5, is_active),
        updated_at = NOW()
    WHERE id = $1
    RETURNING id, name, rate, description, is_active, created_at, updated_at
  `;

  public static readonly DELETE_TAXE_RATE_BY_ID: string = /*sql*/ `
    DELETE FROM tax_rates WHERE id = $1
  `;
}
