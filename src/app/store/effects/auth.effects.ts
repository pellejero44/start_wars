import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/implementations/auth.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
    ) { }

    @Effect()
    LogIn: Observable<any> = this.actions
        .ofType(AuthActionTypes.LOGIN)
        .map((action: LogIn) => action.payload)
        .switchMap(payload => {
            return this.authService.login(payload.email, payload.password)
                .map((res) => {
                    if (res) {
                        return new LogInSuccess({ email: payload.email, password: payload.password });
                    }
                    else {
                        return new LogInFailure({});
                    }
                });
        });

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS)
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    SignUp: Observable<any> = this.actions
        .ofType(AuthActionTypes.SIGNUP)
        .map((action: SignUp) => action.payload)
        .switchMap(payload => {
            return this.authService.signUp(payload.email, payload.password)
                .map((res) => {
                    if (res) {
                        return new SignUpSuccess({ email: payload.email, password: payload.password });
                    }
                    else {
                        return new SignUpFailure({});
                    }
                });
        });

    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_SUCCESS),
        tap((res) => {
            this.authService.setUsers(res.payload.email, res.payload.password);
        })
    );

    @Effect({ dispatch: false })
    SignUpFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.SIGNUP_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => {
            this.authService.logout();
        })
    );

    @Effect({ dispatch: false })
    UserHasAlreadyLoggedInBefore: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.USER_HAS_ALREADY_LOGGED_IN_BEFORE)
    );
}

