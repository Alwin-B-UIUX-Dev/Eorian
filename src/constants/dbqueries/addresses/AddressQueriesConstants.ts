export class AddressQueriesConstants {
  public static readonly INSERT_ADDRESS: string = /*sql*/ `
    INSERT INTO addresses (user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING id
  `;

  public static readonly SELECT_ADDRESS_BY_ID: string = /*sql*/ `
    SELECT id, user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default, created_at, updated_at
    FROM addresses
    WHERE id = $1
  `;

  public static readonly SELECT_ADDRESSES_BY_USER_ID: string = /*sql*/ `
    SELECT id, user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default, created_at, updated_at
    FROM addresses
    WHERE user_id = $1
    ORDER BY is_default DESC, created_at ASC
  `;

  public static readonly SELECT_ADDRESSES_BY_TYPE: string = /*sql*/ `
    SELECT id, user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default, created_at, updated_at
    FROM addresses
    WHERE user_id = $1 AND type = $2
    ORDER BY is_default DESC, created_at ASC
  `;

  public static readonly SELECT_DEFAULT_ADDRESS_BY_USER_AND_TYPE: string = /*sql*/ `
    SELECT id, user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default, created_at, updated_at
    FROM addresses
    WHERE user_id = $1 AND type = $2 AND is_default = true
  `;

  public static readonly SELECT_ALL_ADDRESSES: string = /*sql*/ `
    SELECT id, user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default, created_at, updated_at
    FROM addresses
    ORDER BY user_id, is_default DESC, created_at ASC
    LIMIT $1 OFFSET $2
  `;

  public static readonly UPDATE_ADDRESS: string = /*sql*/ `
    UPDATE addresses
    SET type = COALESCE($2, type),
        first_name = COALESCE($3, first_name),
        last_name = COALESCE($4, last_name),
        company = COALESCE($5, company),
        phone = COALESCE($6, phone),
        address_line_1 = COALESCE($7, address_line_1),
        address_line_2 = COALESCE($8, address_line_2),
        city = COALESCE($9, city),
        postal_code = COALESCE($10, postal_code),
        state_region = COALESCE($11, state_region),
        country = COALESCE($12, country),
        is_default = COALESCE($13, is_default),
        updated_at = NOW()
    WHERE id = $1
    RETURNING id, user_id, type, first_name, last_name, company, phone, address_line_1, address_line_2, city, postal_code, state_region, country, is_default, created_at, updated_at
  `;

  public static readonly DELETE_ADDRESS_BY_ID: string = /*sql*/ `
    DELETE FROM addresses WHERE id = $1
  `;

  public static readonly RESET_DEFAULT_ADDRESSES_BY_USER_AND_TYPE: string = /*sql*/ `
    UPDATE addresses
    SET is_default = false, updated_at = NOW()
    WHERE user_id = $1 AND type = $2 AND is_default = true
  `;
}
