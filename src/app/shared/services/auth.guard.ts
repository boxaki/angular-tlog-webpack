import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private sessionService: SessionService, private authService: AuthService, private router: Router) { }


    canActivate(
        _next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    private checkLogin(url: string): boolean {
        if (this.sessionService.isLoggedIn) {
            return true;
        }

        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);

        return false;
    }
}
