import { createAction, props } from '@ngrx/store';
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

export const LogIn = createAction (
  AuthActionTypes.LOGIN,
  props<{user: User}>()
);

export const LogInSuccess = createAction (
  AuthActionTypes.LOGIN_SUCCESS,
  props<{user: User}>()
);

export const LogInFailure = createAction (
  AuthActionTypes.LOGIN_FAILURE
);


export const SignUp = createAction (
  AuthActionTypes.SIGNUP,
  props<{user: User}>()
);

export const SignUpSuccess = createAction (
  AuthActionTypes.SIGNUP_SUCCESS,
  props<{user: User}>()
);

export const SignUpFailure = createAction (
  AuthActionTypes.SIGNUP_FAILURE
);

export const LogOut = createAction (
  AuthActionTypes.LOGOUT
);

export const UserHasAlreadyLoggedInBefore = createAction (
  AuthActionTypes.USER_HAS_ALREADY_LOGGED_IN_BEFORE
);