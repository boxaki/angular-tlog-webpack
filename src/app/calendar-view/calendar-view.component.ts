import { Component, OnInit } from '@angular/core';
import { DateService } from '../shared/services/date.service';

import { Week } from '../shared/classes/week';
import { Day } from '../shared/classes/day';



@Component({
    selector: 'my-calendar-view',
    templateUrl: './calendar-view.component.html',
    styleUrls: ['./calendar-view.component.scss']
})


export class CalendarViewComponent implements OnInit {
    actualDay: Date;
    days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    month: Week[] = [];

    workDays = [
        { date: '2018-6-4', extraMinutes: 30 },
        { date: '2018-6-5', extraMinutes: 60 },
        { date: '2018-6-6', extraMinutes: -30 },
        { date: '2018-6-7', extraMinutes: 30 },
        { date: '2018-6-11', extraMinutes: 45 },
        { date: '2018-6-12', extraMinutes: 15 },
        { date: '2018-6-13', extraMinutes: -30 }
    ];


    constructor(private dateService: DateService) {
    }

    ngOnInit() {
        this.dateService.currentDate.subscribe(actualDay => { this.actualDay = actualDay; this.initMonth(); });
    }

    initMonth(): void {
        const otherMonth: Day = new Day('other-month', 0, 0, 0);
        this.month = [];
        let selectedYear = this.actualDay.getFullYear();
        let selectedMonth = this.actualDay.getMonth();

        let dayOfMonth = 1;
        let indent: number = this.getIndent(selectedYear, selectedMonth);
        let lengthOfMonth = this.getLengthOfMonth(selectedYear, selectedMonth);


        while (dayOfMonth <= lengthOfMonth) {
            let oneWeek = new Week();
            oneWeek.days = [];

            while (indent > 0) {
                oneWeek.days.push(otherMonth);
                indent--;
            }

            while (oneWeek.days.length < 7) {
                if (dayOfMonth <= lengthOfMonth) {
                    oneWeek.days.push(this.setDay(selectedYear, selectedMonth + 1, dayOfMonth));
                    dayOfMonth++;
                } else {
                    oneWeek.days.push(otherMonth);
                }
            }

            this.month.push(oneWeek);
        }
    }

    setDay(year: number, month: number, day: number): Day {
        let date = year + '-' + month + '-' + day;
        let newDay: Day;

        for (let workDay of this.workDays) {

            if (workDay.date === date) {
                newDay = new Day('workday', year, month, day);
                newDay.extraMinutes = workDay.extraMinutes;
                return newDay;
            }
        }
        return new Day('simple-day', year, month, day);

    }

    getIndent(year: number, month: number): number {
        let date = new Date(year, month, 1);
        let indent = date.getDay();
        if (indent === 0) {
            indent = 6;
        } else {
            indent--;
        }
        return indent;
    }

    getLengthOfMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

}
