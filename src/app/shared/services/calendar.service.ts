import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { HttpService } from './http.service';

import { Week } from '../classes/week';
import { Day } from '../classes/day';
import { WorkDay } from '../classes/workDay';
import { WorkDayRB } from '../classes/workDayRB';
import { SelectedDayService } from './selectedDay.service';

@Injectable()
export class CalendarService {
    private month: Week[];
    private monthSource = new BehaviorSubject(this.month);
    currentMonth = this.monthSource.asObservable();

    private actualDay: Date = new Date();

    constructor(
        private httpService: HttpService, private selectedDayService: SelectedDayService
    ) { }

    /**
     * Creates the calendar and updates the statistics for the selected month
     */
    updateCalendarAndStats(actualDate?: Date): void {
        if (actualDate) {
            this.actualDay = actualDate;
        }
        this.httpService.getMonthsData(this.actualDay.getFullYear(), this.actualDay.getMonth() + 1)
            .map((days) => days.sort(this.compareActualDays))
            .subscribe(workDays => {
                this.createCalendar(workDays);
                this.monthSource.next(this.month);
            });
    }

    private compareActualDays(day1: WorkDay, day2: WorkDay): number {
        return parseInt(day2.actualDay.split('-')[2], 10) - parseInt(day1.actualDay.split('-')[2], 10);
    }

    private createCalendar(workDays: WorkDay[]): void {
        const otherMonth: Day = new Day('other-month', 0, 0, 0);
        this.month = [];
        let selectedYear = this.actualDay.getFullYear();
        let selectedMonth = this.actualDay.getMonth();

        let dayOfMonth = 1;
        let indent: number = this.getIndent(selectedYear, selectedMonth);
        let lengthOfMonth = this.getLengthOfMonth(selectedYear, selectedMonth);

        while (dayOfMonth <= lengthOfMonth) {
            let oneWeek: Week = {
                days: []
            };

            while (indent > 0) {
                oneWeek.days.push(otherMonth);
                indent--;
            }

            while (oneWeek.days.length < 7) {
                if (dayOfMonth <= lengthOfMonth) {
                    oneWeek.days.push(this.setDay(selectedYear, selectedMonth + 1, dayOfMonth, workDays));
                    dayOfMonth++;
                } else {
                    oneWeek.days.push(otherMonth);
                }
            }

            this.month.push(oneWeek);
        }
    }

    private setDay(year: number, month: number, day: number, workDays: WorkDay[]): Day {
        let date = year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day);

        if (workDays.length > 0) {
            let selectedDay = workDays[workDays.length - 1];

            if (selectedDay.actualDay === date) {
                let newDay = new Day('workday', year, month, day);
                newDay.extraMinutes = selectedDay.sumPerDay - selectedDay.requiredMinPerDay; // setExtraMinutes?
                workDays.pop();

                return newDay;
            }
        }
        return new Day('simple-day', year, month, day);
    }

    private getIndent(year: number, month: number): number {
        let date = new Date(year, month, 1);
        let indent = date.getDay();
        if (indent === 0) {
            indent = 6;
        } else {
            indent--;
        }
        return indent;
    }

    private getLengthOfMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Sets the required minutes for a workday. Asks for confirmation if the day is on the weekend.
     * @param requiredMinPerDay required work minutes for the day
     */
    activateDay(requiredMinPerDay: number): void {

        let newDay: WorkDayRB = {
            year: this.selectedDayService.selectedDay.getFullYear(),
            month: this.selectedDayService.selectedDay.getMonth() + 1,
            day: this.selectedDayService.selectedDay.getDate(),
            requiredMinPerDay: requiredMinPerDay
        };

        this.httpService
            .activateDay(newDay)
            .subscribe(
                () => this.updateCalendarAndStats(),
                error => this.handleWeekendError(error, newDay)
            );
    }

    private handleWeekendError(error: HttpErrorResponse, newDay: WorkDayRB) {
        if (error.status === 302) {
            if (confirm('Do you want to activate weekend day?')) {
                this.activateWeekend(newDay);
            }
        }
    }

    private activateWeekend(weekendDay: WorkDayRB): void {
        this.httpService.activateWeekendDay(weekendDay)
            .subscribe(() => this.updateCalendarAndStats());
    }

}
