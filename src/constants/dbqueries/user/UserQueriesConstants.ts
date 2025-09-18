// src/constants/dbqueries/UserQueriesConstants.ts
export class UserQueriesConstants {
  // CREATE - INSERT
  public static readonly INSERT_USER: string = /*sql*/ `
    INSERT INTO users (email, username, password_hash, role_id, is_active, email_verified, gdpr_consent, gdpr_consent_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `;

  // READ - SELECT (depuis views)
  public static readonly SELECT_USER_BY_ID: string = /*sql*/ `
    SELECT * FROM v_user_login
    WHERE user_id = $1
  `;

  public static readonly SELECT_USER_PROFILE_COMPLETE: string = /*sql*/ `
    SELECT * FROM v_user_profiles_complete
    WHERE user_id = $1
  `;

  public static readonly SELECT_USER_BY_EMAIL_OR_USERNAME: string = /*sql*/ `
    SELECT * FROM v_user_login
    WHERE email = $1 OR username = $1
  `;

  public static readonly SELECT_USER_BY_EMAIL: string = /*sql*/ `
    SELECT * FROM v_user_login
    WHERE email = $1
  `;

  public static readonly SELECT_USER_BY_USERNAME: string = /*sql*/ `
    SELECT * FROM v_user_login
    WHERE username = $1
  `;

  public static readonly SELECT_ALL_USERS: string = /*sql*/ `
    SELECT * FROM v_user_login
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2;
`;

  // UPDATE
  public static readonly UPDATE_LOGIN_STATUS: string = /*sql*/ `
    UPDATE users
    SET is_connected = $2, last_login_at = $3, updated_at = NOW()
    WHERE id = $1
  `;

  public static readonly UPDATE_PASSWORD: string = /*sql*/ `
  UPDATE users
  SET password_hash = $1, updated_at = NOW()
  WHERE id = $2
`;

  // UPSERT (UPDATE ou INSERT) pour la table USERS seulement (SÉCURISÉ)
  public static readonly UPSERT_USER_WITHOUT_PASSWORD: string = /*sql*/ `
  INSERT INTO users (id, username, email, role_id, is_active, email_verified, updated_at)
  VALUES ($1, $2, $3, $4, $5, $6, NOW())
  ON CONFLICT (id)
  DO UPDATE SET
    username = COALESCE(EXCLUDED.username, users.username),
    email = COALESCE(EXCLUDED.email, users.email),
    role_id = COALESCE(EXCLUDED.role_id, users.role_id),
    is_active = COALESCE(EXCLUDED.is_active, users.is_active),
    email_verified = COALESCE(EXCLUDED.email_verified, users.email_verified),
    updated_at = NOW()
  RETURNING *
`;

  // DELETE
  public static readonly DELETE_USER_BY_ID: string = /*sql*/ `
    DELETE FROM users
    WHERE id = $1
  `;

  // CHECK EXISTENCE
  public static readonly CHECK_EMAIL_EXISTS: string = /*sql*/ `
    SELECT COUNT(*) as count
    FROM users
    WHERE email = $1
    AND ($2 IS NULL OR id != $2)
  `;

  public static readonly CHECK_USERNAME_EXISTS: string = /*sql*/ `
    SELECT COUNT(*) as count
    FROM users
    WHERE username = $1
    AND ($2 IS NULL OR id != $2)
  `;
}
