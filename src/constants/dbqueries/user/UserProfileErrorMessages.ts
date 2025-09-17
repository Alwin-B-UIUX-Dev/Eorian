// src/constants/dbqueries/user/UserProfileErrorMessages.ts
export class UserProfileErrorMessages {
  public static readonly CREATE_USER_PROFILE_FAILED: string = 'Failed to create user profile';
  public static readonly CREATE_USER_PROFILE_DUPLICATE: string =
    'User profile already exists for this user';
  public static readonly UPDATE_USER_PROFILE_FAILED: string = 'Failed to update user profile';
  public static readonly DELETE_USER_PROFILE_FAILED: string = 'Failed to delete user profile';
  public static readonly FIND_USER_PROFILE_FAILED: string = 'Failed to find user profile';
  public static readonly FIND_ALL_USER_PROFILES_FAILED: string = 'Failed to find all user profiles';
  public static readonly PHONE_ALREADY_EXISTS: string = 'Phone number already exists';
  public static readonly USER_PROFILE_NOT_FOUND: string = 'User profile not found';
  public static readonly DUPLICATE_KEY: string = 'duplicate key value violates unique constraint';
}

