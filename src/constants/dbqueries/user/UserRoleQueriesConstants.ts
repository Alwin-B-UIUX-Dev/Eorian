// src/constants/dbqueries/user/UserRoleQueriesConstants.ts

export class UserRoleQueriesConstants {
  public static readonly INSERT_USER_ROLE: string = /*sql*/ `
    INSERT INTO user_roles (role_name, description)
    VALUES ($1, $2)
    RETURNING id
  `;

  public static readonly SELECT_USER_ROLE_BY_ID: string = /*sql*/ `
    SELECT id, role_name, description, created_at, updated_at
    FROM user_roles
    WHERE id = $1
  `;

  public static readonly SELECT_USER_ROLE_BY_NAME: string = /*sql*/ `
    SELECT id, role_name, description, created_at, updated_at
    FROM user_roles
    WHERE role_name = $1
  `;

  public static readonly SELECT_ALL_USER_ROLES: string = /*sql*/ `
    SELECT id, role_name, description, created_at, updated_at
    FROM user_roles
    ORDER BY role_name ASC
    LIMIT $1 OFFSET $2
  `;

  public static readonly UPDATE_USER_ROLE: string = /*sql*/ `
    UPDATE user_roles
    SET role_name = COALESCE($2, role_name),
        description = COALESCE($3, description),
        updated_at = NOW()
    WHERE id = $1
    RETURNING id, role_name, description, created_at, updated_at
  `;

  public static readonly DELETE_USER_ROLE_BY_ID: string = /*sql*/ `
    DELETE FROM user_roles WHERE id = $1
  `;
}




