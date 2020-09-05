import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/implementations/auth.service';
import * as fromAuthActions from '../actions/auth.actions';
import { User } from 'src/app/models/user';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.LogIn),
            map((action) => action.user),
            switchMap((payload: User) => {
                return this.authService.logIn(payload.email, payload.password).pipe(
                    map((user) => {
                        if (user) {
                            this.authService.logInResponse(user.token);
                            return fromAuthActions.LogInSuccess({ user });
                        } else {
                            return fromAuthActions.LogInFailure();
                        }
                    }),
                    catchError((error) => of(fromAuthActions.LogInFailure()))
                )
            })
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.LogInSuccess)
        ),
        { dispatch: false }
    );

    logInFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.LogInFailure)
        ),
        { dispatch: false }
    );

    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.SignUp),
            map((action) => action.user),
            switchMap((payload: User) => {
                return this.authService.signUp(payload).pipe(
                    map((user) => {
                        if (user) {
                            return fromAuthActions.SignUpSuccess({ user });
                        } else {
                            return fromAuthActions.SignUpFailure();
                        }
                    }),
                    catchError((error) => of(fromAuthActions.SignUpFailure()))
                )
            })
        )
    );

    signUpSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.SignUpSuccess),
            tap(() => {
                this.authService.signUpResponse();
            })
        ),
        { dispatch: false }
    );

    signUpFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.SignUpFailure)
        ),
        { dispatch: false }
    );

    logOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuthActions.LogOut),
            tap(() => {
                this.authService.logOutResponse();
            })
        ),
        { dispatch: false }
    );

    userHasAlreadyLoggedInBefore$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromAuthActions.UserHasAlreadyLoggedInBefore)
        ),
        { dispatch: false }
    );
}

