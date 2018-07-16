import { Component, OnInit, Input } from '@angular/core';

import { Week } from '../../shared/classes/week';

@Component({
    selector: '[my-week]',
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
    @Input() week: Week;

    constructor() { }

    ngOnInit() {
    }

}
