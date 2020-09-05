import * as auth from './reducers/auth.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<auth.State>('authReducer');


export const selectErrorMessageLogin = createSelector(
  selectAuthState,
  (state: auth.State) => state.errorMessageLogin
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: auth.State) => state.isAuthenticated
);


