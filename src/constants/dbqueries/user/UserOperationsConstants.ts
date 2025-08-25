// src/constants/dbqueries/UserOperationsConstants.ts
export class UserOperationsConstants {
  public static readonly CREATE_USER: string = 'create_user';
  public static readonly UPDATE_USER: string = 'update_user';
  public static readonly DELETE_USER_BY_ID: string = 'delete_user_by_id';
  public static readonly FIND_USER_BY_ID: string = 'find_user_by_id';
  public static readonly FIND_USER_BY_EMAIL_OR_USERNAME: string = 'find_user_by_email_or_username';
  public static readonly FIND_USER_BY_EMAIL: string = 'find_user_by_email';
  public static readonly FIND_USER_BY_USERNAME: string = 'find_user_by_username';
  public static readonly FIND_ALL_USERS: string = 'find_all_user';
  public static readonly UPDATE_LOGIN_STATUS: string = 'update_login_status';
}
