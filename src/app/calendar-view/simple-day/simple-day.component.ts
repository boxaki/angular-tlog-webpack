import { Component, OnInit, Input } from '@angular/core';

import { Day } from '../../shared/classes/day';

@Component({
    selector: 'my-simple-day',
    templateUrl: './simple-day.component.html',
    styleUrls: ['./simple-day.component.scss']
})
export class SimpleDayComponent implements OnInit {
    @Input() day: Day;
    id: string;

    constructor() {
    }

    ngOnInit() {
        this.id = '' + this.day.year + '-' + this.day.month + '-' + this.day.day;
    }

}
