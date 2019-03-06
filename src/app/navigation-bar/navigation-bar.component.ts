import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SessionService } from '../shared/services/session.service';

@Component({
    selector: 'my-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
    selectedRoute = 'calendar';

    constructor(public sessionService: SessionService, private authService: AuthService) { }

    ngOnInit() {
    }

    onSelect(route: string): void {
        this.selectedRoute = route;
    }

    logout() {
        this.authService.logout();
    }

    getUsername() { // kell e, vagy inkább template-ben service property bind
        return this.sessionService.getUsername();
    }

}
