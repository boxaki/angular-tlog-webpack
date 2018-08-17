import { Component, OnInit, Input } from '@angular/core';

import { Day } from '../../shared/classes/day';
import { DateService } from '../../shared/services/date.service';

@Component({
    selector: 'my-simple-day',
    templateUrl: './simple-day.component.html',
    styleUrls: ['./simple-day.component.scss']
})
export class SimpleDayComponent implements OnInit {
    @Input() day: Day;

    constructor(private dateService: DateService) {
    }

    ngOnInit() {
    }

    setSelectedDay(): void {
        this.dateService.setSelectedDay(this.day);
    }

}