import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SessionService {

    isLoggedIn = false;
    // loggedInSource = new BehaviorSubject(this.isLoggedIn);
    /*
    get loggedIn() {
        return this.loggedInSource.asObservable();
    }
    */

    get username(): Observable<string> {
        let userName = sessionStorage.getItem('username');
        if (userName) {
            console.log('username: ' + userName);
            return of(userName);
        }
        return of('');
    }

    constructor() { };

    setJwt(jwt: string) {
        sessionStorage.setItem('jwt', jwt);
        this.isLoggedIn = true;
        // this.loggedInSource.next(true);
    }

    removeJwt() {
        sessionStorage.removeItem('jwt');
        this.isLoggedIn = false;
        // this.loggedInSource.next(false);
    }

    isJwtExists(): boolean {
        return !!sessionStorage.getItem('jwt');
    }

    setUsername(username: string) {
        sessionStorage.setItem('username', username);
    }

    getUsername(): string {
        return sessionStorage.getItem('username');
    }

    removeUsername() {
        sessionStorage.removeItem('username');
    }
}
