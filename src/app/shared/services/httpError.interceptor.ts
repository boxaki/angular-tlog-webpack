import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private sessionService: SessionService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            tap(
                () => { },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            this.sessionService.removeSession();
                            this.router.navigate(['/login']);
                        } else if (err.status === 403) {
                            if (confirm(err.error)) { }
                        } else if (err.status === 409) {
                            if (confirm('Username is taken!')) { }
                        }
                    }
                }
            )
        );
    }
}
