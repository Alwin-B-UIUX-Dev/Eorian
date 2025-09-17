// src/constants/dbqueries/user/UserProfileQueriesConstants.ts
export class UserProfileQueriesConstants {
  // CREATE - INSERT
  public static readonly INSERT_USER_PROFILE: string = /*sql*/ `
    INSERT INTO user_profiles (
      user_id, 
      first_name, 
      last_name, 
      phone, 
      birth_date, 
      avatar_url
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  // READ - SELECT
  public static readonly SELECT_USER_PROFILE_BY_ID: string = /*sql*/ `
    SELECT * FROM user_profiles
    WHERE id = $1
  `;

  public static readonly SELECT_USER_PROFILE_BY_USER_ID: string = /*sql*/ `
    SELECT * FROM user_profiles
    WHERE user_id = $1
  `;

  public static readonly SELECT_USER_PROFILE_BY_PHONE: string = /*sql*/ `
    SELECT * FROM user_profiles
    WHERE phone = $1
  `;

  public static readonly SELECT_USER_PROFILE_BY_FULL_NAME: string = /*sql*/ `
    SELECT * FROM user_profiles
    WHERE first_name ILIKE $1 AND last_name ILIKE $2
  `;

  public static readonly SELECT_ALL_USER_PROFILES: string = /*sql*/ `
    SELECT * FROM user_profiles
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

  public static readonly CHECK_PHONE_EXISTS: string = /*sql*/ `
    SELECT COUNT(*) as count FROM user_profiles
    WHERE phone = $1 AND ($2 IS NULL OR user_id != $2)
  `;

  // UPDATE
  public static readonly UPDATE_USER_PROFILE: string = /*sql*/ `
    UPDATE user_profiles
    SET 
      first_name = COALESCE($2, first_name),
      last_name = COALESCE($3, last_name),
      phone = COALESCE($4, phone),
      birth_date = COALESCE($5, birth_date),
      avatar_url = COALESCE($6, avatar_url),
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;

  public static readonly UPDATE_USER_PROFILE_BY_USER_ID: string = /*sql*/ `
    UPDATE user_profiles
    SET 
      first_name = COALESCE($2, first_name),
      last_name = COALESCE($3, last_name),
      phone = COALESCE($4, phone),
      birth_date = COALESCE($5, birth_date),
      avatar_url = COALESCE($6, avatar_url),
      updated_at = NOW()
    WHERE user_id = $1
    RETURNING *
  `;

  // DELETE
  public static readonly DELETE_USER_PROFILE_BY_ID: string = /*sql*/ `
    DELETE FROM user_profiles
    WHERE id = $1
  `;

  public static readonly DELETE_USER_PROFILE_BY_USER_ID: string = /*sql*/ `
    DELETE FROM user_profiles
    WHERE user_id = $1
  `;
}
