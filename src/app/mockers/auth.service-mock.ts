import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceMock {

    public isLoggedIn(): boolean {
        const jwtToken = localStorage.getItem('fakeToken');
        return jwtToken !== null ? true : false;
    }
}


