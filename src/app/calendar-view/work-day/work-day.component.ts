import { Component, OnInit, Input } from '@angular/core';

import { DateService } from '../../shared/services/date.service';
import { Day } from '../../shared/classes/day';

@Component({
    selector: 'my-work-day',
    templateUrl: './work-day.component.html',
    styleUrls: ['./work-day.component.scss']
})
export class WorkDayComponent implements OnInit {
    @Input() day: Day;

    constructor(private dateService: DateService) { }

    ngOnInit() {
    }

    /**
     * Selects one work day of the calendar for the task-list-view
     */
    setSelectedDay() {
        // this.dateService.setSelectedDay(this.day);
        this.dateService.setSelectedDay(
            new Date(this.day.year, this.day.month - 1, this.day.day)
        );

    }

}
