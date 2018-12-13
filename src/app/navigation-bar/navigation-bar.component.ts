import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AuthTokenService } from '../shared/services/authToken.service';

@Component({
    selector: 'my-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
    selectedRoute = 'calendar';

    constructor(public authTokenService: AuthTokenService, private authService: AuthService) { }

    ngOnInit() {
    }

    onSelect(route: string): void {
        this.selectedRoute = route;
    }

    logout() {
        this.authService.logout();
    }

}
