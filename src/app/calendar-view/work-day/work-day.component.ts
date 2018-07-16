import { Component, OnInit, Input } from '@angular/core';

import { Day } from '../../shared/classes/day';

@Component({
    selector: 'my-work-day',
    templateUrl: './work-day.component.html',
    styleUrls: ['./work-day.component.scss']
})
export class WorkDayComponent implements OnInit {
    @Input() day: Day;

    constructor() { }

    ngOnInit() {
    }

}
