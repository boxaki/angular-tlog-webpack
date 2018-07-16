import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
    selectedRoute = 'calendar';

    constructor() {}

    ngOnInit() {
    }

    onSelect(route: string): void {
        this.selectedRoute = route;
    }

}
