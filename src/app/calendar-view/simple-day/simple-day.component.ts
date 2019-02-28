import { Component, OnInit, Input } from '@angular/core';

import { Day } from '../../shared/classes/day';
import { SelectedDayService } from '../../shared/services/selectedDay.service';

@Component({
    selector: 'my-simple-day',
    templateUrl: './simple-day.component.html',
    styleUrls: ['./simple-day.component.scss']
})
export class SimpleDayComponent implements OnInit {
    @Input() day: Day;

    constructor(private selectedDayService: SelectedDayService) {
    }

    ngOnInit() {
    }

    /**
     * Selects one day of the calendar for activate-day component
     */
    setSelectedDay(): void {
        this.selectedDayService.setSelectedDay(
            new Date(this.day.year, this.day.month - 1, this.day.day)
        );

    }

}
