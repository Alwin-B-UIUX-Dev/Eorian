// src/constants/dbqueries/UserErrorMessagesConstants.ts
export class UserErrorMessagesConstants {
  public static readonly DUPLICATE_KEY: string = 'duplicate_key';
  public static readonly CREATE_USER_DUPLICATE: string = 'create_user_duplicate_email';
  public static readonly CREATE_USER_FAILED: string = 'create_user_failed';
  public static readonly DELETE_USER_FAILED: string = 'delete_user_by_id_failed';
  public static readonly FIND_USER_BY_ID_FAILED: string = 'find_user_by_id_failed';
  public static readonly FIND_USER_BY_EMAIL_OR_USERNAME_FAILED: string =
    'find_user_by_email_or_username_failed';
  public static readonly FIND_USER_BY_EMAIL_FAILED: string = 'find_user_by_email_failed';
  public static readonly FIND_USER_BY_USERNAME_FAILED: string = 'find_user_by_username_failed';
  public static readonly FIND_ALL_USERS_FAILED: string = 'find_all_user_failed';
  public static readonly UPDATE_LOGIN_STATUS_FAILED: string = 'update_login_status_failed';
  public static readonly UPDATE_USER_DUPLICATE: string = 'update_user_duplicate_email_or_username';
  public static readonly UPDATE_USER_FAILED: string = 'update_user_failed';
}
