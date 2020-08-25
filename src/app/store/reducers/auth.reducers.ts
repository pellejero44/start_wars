import { User } from 'src/app/models/user';
import { All, AuthActionTypes } from '../actions/auth.actions';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message for login
  errorMessageLogin: string | null;  
  //controlling if the view for login can be close
  canCloseLoginView:boolean | null;
  // error message for login
  errorMessageSignUp: string | null;  
  //controlling if the view for signup can be close
  canCloseSignUpView:boolean | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessageLogin: null,
  canCloseLoginView: null,
  errorMessageSignUp:null,
  canCloseSignUpView: null
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
            errorMessageLogin: null,
            canCloseLoginView: true
          }
        }
        case AuthActionTypes.LOGIN_FAILURE: {
          return {
            ...state,
            errorMessageLogin: 'Incorrect email and/or password.',
            canCloseLoginView: false
          };
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
          return {
            ...state,
            isAuthenticated: false,
            user: {
              password: action.payload.password,
              email: action.payload.email
            },
            errorMessageSignUp: null,
            canCloseSignUpView: true
          };
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
          return {
            ...state,
            errorMessageSignUp: 'That email is already in use.',
            canCloseSignUpView: false
          };
        }
        case AuthActionTypes.LOGOUT: {
          return initialState;
        }
        case AuthActionTypes.USER_HAS_ALREADY_LOGGED_IN_BEFORE: {
          return {
            ...state,
            isAuthenticated: true
          };
        }
        default: {
            return state;
        }
    }
}