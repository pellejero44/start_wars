import { User } from 'src/app/models/user';
import { All, AuthActionTypes } from '../actions/auth.actions';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;

}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State{
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
          return {
            ...state,
            isAuthenticated: true,
            user: {
              email: action.payload.email,
              password: action.payload.password
            },
            errorMessage: null
          }
        }
        case AuthActionTypes.LOGIN_FAILURE: {
          return {
            ...state,
            errorMessage: 'Incorrect email and/or password.'
          };
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
          return {
            ...state,
            isAuthenticated: true,
            user: {
              password: action.payload.password,
              email: action.payload.email
            },
            errorMessage: null
          };
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
          return {
            ...state,
            errorMessage: 'That email is already in use.'
          };
        }
        case AuthActionTypes.LOGOUT: {
          return initialState;
        }
        default: {
            return state;
        }
    }
}