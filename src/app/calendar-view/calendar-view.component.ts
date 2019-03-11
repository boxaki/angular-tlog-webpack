import { Component, OnInit, OnDestroy } from '@angular/core';

import { CalendarService } from '../shared/services/calendar.service';
import { DateService } from '../shared/services/date.service';
import { MonthlyStatsService } from '../shared/services/monthlyStats.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'my-calendar-view',
    templateUrl: './calendar-view.component.html',
    styleUrls: ['./calendar-view.component.scss']
})

export class CalendarViewComponent implements OnInit, OnDestroy {
    days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    subscription: ISubscription;

    constructor(
        public calendarService: CalendarService, public dateService: DateService, public monthlyStatsService: MonthlyStatsService) {
    }

    /**
     * Updates the view if anything changed in the task-list-view
     */
    ngOnInit() {
        /*
        if (this.tasksService.tasksChanged) { // meg lehet e oldani routerrel akkor nem kene a taskservice
            this.tasksService.setTasksNotChanged();
            this.calendarService.updateCalendarAndStats();
        }
        */
        this.subscription = this.dateService.currentDate.subscribe(
            selectedDate => {
                this.calendarService.updateCalendarAndStats(selectedDate);
                this.monthlyStatsService.updateMonthlyStats(selectedDate);
            });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
