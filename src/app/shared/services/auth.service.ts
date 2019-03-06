import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { UserRB } from '../classes/userRB';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { switchMap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { User } from '../classes/user';

const refreshIntervalInSec = 4 * 60;

@Injectable()
export class AuthService {
    redirectUrl = '/';
    timer;

    constructor(
        private router: Router, private httpService: HttpService, private sessionService: SessionService
    ) {
        if (this.sessionService.isJwtExists()) {
            httpService.refresh().subscribe(
                res => {
                    this.setSession(res);
                    this.setRefreshInterval();
                    router.navigateByUrl(this.redirectUrl);
                }
            );
        }
    };

    public login(user: UserRB) {
        return this.httpService.login(user).map(
            (res) => {
                this.setSession(res);
                this.setRefreshInterval();

                this.router.navigateByUrl(this.redirectUrl);
            }
        );
    }

    private setSession(authResult: HttpResponse<User>) {
        let authHeader = authResult.headers.get('authorization');
        let jwt = authHeader.split(' ')[1];
        let userName = authResult.body.name;
        console.log('username: ' + userName);

        if (!this.sessionService.isLoggedIn) {
            this.sessionService.setUsername(userName);
        }
        this.sessionService.setJwt(jwt);
    }

    private setRefreshInterval() {
        if (this.timer) {
            this.timer.unsubscribe();
        }
        this.timer = TimerObservable.create(refreshIntervalInSec * 1000, refreshIntervalInSec * 1000)
            .pipe(
                switchMap(() => this.httpService.refresh())
            )
            .subscribe((res) => {
                this.setSession(res);
            });
    }

    public register(user: UserRB) {
        this.httpService.register(user).subscribe(
            () => {
                if (confirm('Successful registration you can log in!')) { }
            },
            error => {
                this.handleError(error);
            }
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 409) {
            if (confirm('Username is taken!')) { }
        } else if (error.status === 403) {
            if (confirm('Authentication failure!')) { }
        } else if (error.status === 401) {
            if (confirm('You are not logged in. Please log in to continue!')) { }
            this.sessionService.isLoggedIn = false;
        }
    }

    public logout() {
        if (this.timer) {
            this.timer.unsubscribe();
        }

        this.sessionService.removeJwt();
        // this.router.navigate(['/login']);  ez lenne a jo megoldas, a login.component routerlink helyett,
        // csak a css ben at kell írni, hogy az <a href nelkul linkkent jelenjen meg
    }


}
