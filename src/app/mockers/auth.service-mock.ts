export class AuthServiceMock {
    isLogIn: boolean = true;

    public isLoggedIn(): boolean {
        return this.isLogIn;
    }  
}
  