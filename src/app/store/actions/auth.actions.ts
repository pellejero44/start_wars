import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth Signup] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
  USER_HAS_ALREADY_LOGGED_IN_BEFORE = '[Auth] User Has Already LoggedIn Before'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: User) { }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) { }
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) { }
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) { }
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor(public payload: any) { }
}

export class UserHasAlreadyLoggedInBefore implements Action {
  readonly type = AuthActionTypes.USER_HAS_ALREADY_LOGGED_IN_BEFORE;
  constructor(public payload: any) { }
}



export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | UserHasAlreadyLoggedInBefore;
  