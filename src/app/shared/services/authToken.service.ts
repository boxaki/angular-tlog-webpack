import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenService {

    constructor() { };

    isLoggedIn = false; // beavior subject?; private

    setJwt(jwt: string) {
        sessionStorage.setItem('jwt', jwt);
        this.isLoggedIn = true;
    }

    removeJwt() {
        sessionStorage.removeItem('jwt');
        this.isLoggedIn = false;
    }

    isJwtExists(): boolean {
        return !!sessionStorage.getItem('jwt');
    }
}