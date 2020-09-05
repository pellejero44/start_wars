import { User } from 'src/app/models/user';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromAuthActions from '../actions/auth.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessageLogin: string | null;
  canCloseLoginView: boolean | null;
  errorMessageSignUp: string | null;
  canCloseSignUpView: boolean | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessageLogin: null,
  canCloseLoginView: null,
  errorMessageSignUp: null,
  canCloseSignUpView: null
};

const authReducer = createReducer(
    initialState,
    on(fromAuthActions.LogIn, (state, {user} ) => (
      {
        ...state,
        isAuthenticated: false,
        user: {
          email: user.email,
          password: user.password,
          token: user.token
        },
        errorMessageLogin: null,
        canCloseLoginView: false
      }
    )),
    on(fromAuthActions.LogInSuccess, (state, {user} )  => (
      {
        ...state,
        isAuthenticated: true,
        user: {
          email: user.email,
          password: user.password,
          token: user.token
        },
        errorMessageLogin: null,
        canCloseLoginView: true
      }
    )),
    on(fromAuthActions.LogInFailure, state  => (
      {
        ...state,
        errorMessageLogin: 'Username or password is incorrect',
        canCloseLoginView: false
      }
    )),
    on(fromAuthActions.SignUp, (state, {user} ) => (
      {
        ...state,
        isAuthenticated: false,
        user: {
          email: user.email,
          password: user.password,
          token: null
        },
        errorMessageSignUp: null,
        canCloseSignUpView: false
      }
    )),
    on(fromAuthActions.SignUpSuccess, (state, {user} ) => (
      {
        ...state,
        isAuthenticated: false,
        user: {
          email: user.email,
          password: user.password,
          token: null
        },
        errorMessageSignUp: null,
        canCloseSignUpView: true
      }
    )),
    on(fromAuthActions.SignUpFailure, state  => (
      {
        ...state,
        errorMessageSignUp: 'That email is already in use.',
        canCloseSignUpView: false
      }
    )),
    on(fromAuthActions.LogOut, state  => (
      {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessageLogin: null,
        canCloseLoginView: null,
        errorMessageSignUp: null,
        canCloseSignUpView: null
      }
    )),
    on(fromAuthActions.UserHasAlreadyLoggedInBefore, state  => (
      {
        ...state,
        isAuthenticated: true
      }
    ))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}