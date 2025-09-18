// src/constants/dbqueries/user/UserProfileLogOperations.ts
export class UserProfileLogOperations {
  public static readonly CREATE_USER_PROFILE: string = 'CREATE_USER_PROFILE';
  public static readonly UPDATE_USER_PROFILE: string = 'UPDATE_USER_PROFILE';
  public static readonly DELETE_USER_PROFILE_BY_ID: string = 'DELETE_USER_PROFILE_BY_ID';
  public static readonly DELETE_USER_PROFILE_BY_USER_ID: string = 'DELETE_USER_PROFILE_BY_USER_ID';
  public static readonly FIND_USER_PROFILE_BY_ID: string = 'FIND_USER_PROFILE_BY_ID';
  public static readonly FIND_USER_PROFILE_BY_USER_ID: string = 'FIND_USER_PROFILE_BY_USER_ID';
  public static readonly FIND_USER_PROFILE_BY_PHONE: string = 'FIND_USER_PROFILE_BY_PHONE';
  public static readonly FIND_USER_PROFILE_BY_FULL_NAME: string = 'FIND_USER_PROFILE_BY_FULL_NAME';
  public static readonly FIND_ALL_USER_PROFILES: string = 'FIND_ALL_USER_PROFILES';
  public static readonly CHECK_PHONE_EXISTS: string = 'CHECK_PHONE_EXISTS';
}

