import { Component, OnInit } from '@angular/core';

import { CalendarService } from '../shared/services/calendar.service';
import { TasksService } from '../shared/services/tasks.service';

@Component({
    selector: 'my-calendar-view',
    templateUrl: './calendar-view.component.html',
    styleUrls: ['./calendar-view.component.scss']
})

export class CalendarViewComponent implements OnInit {
    days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    constructor(public calendarService: CalendarService, public tasksService: TasksService) {
    }

    /**
     * Updates the view if anything changed in the task-list-view
     */
    ngOnInit() {
        if (this.tasksService.tasksChanged) { // meg lehet e oldani routerrel akkor nem kene a taskservice
            this.tasksService.setTasksNotChanged();
            this.calendarService.updateCalendarAndStats();
        }
    }
}
