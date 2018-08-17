import { Component, OnInit, Input } from '@angular/core';

import { DateService } from '../../shared/services/date.service';
// import { TasksService } from '../../shared/services/tasks.service';

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

    setSelectedDay() {
        console.log('set selected day' + this.day);
        this.dateService.setSelectedDay(this.day);
    }

}
