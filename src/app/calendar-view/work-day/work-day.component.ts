import { Component, OnInit, Input } from '@angular/core';

import { Day } from '../../shared/classes/day';
import { SelectedDayService } from '../../shared/services/selectedDay.service';

@Component({
    selector: 'my-work-day',
    templateUrl: './work-day.component.html',
    styleUrls: ['./work-day.component.scss']
})
export class WorkDayComponent implements OnInit {
    @Input() day: Day;

    constructor(private selectedDayService: SelectedDayService) { }

    ngOnInit() {
    }

    /**
     * Selects one work day of the calendar for the task-list-view
     */
    setSelectedDay() {
        this.selectedDayService.setSelectedDay(
            new Date(this.day.year, this.day.month - 1, this.day.day)
        );

    }

}
