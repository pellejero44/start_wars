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
        } default: {
            return state;
        }
    }
}