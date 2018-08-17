import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

import { HttpService } from './http.service';
import { DateService } from './date.service';

import { Week } from '../classes/week';
import { Day } from '../classes/day';
import { WorkDay } from '../classes/workDay';
import { WorkMonth } from '../classes/workMonth';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CalendarService {
    sumPerMonth: number;
    requiredMinPerMonth: number;
    extraMinPerMonth: number;
    month: Week[] = [];


    actualDay: Date;  // lokalis valtozo
    // private monthSource = new BehaviorSubject(this.month);
    // currentMonth = this.monthSource.asObservable();

    constructor(private httpService: HttpService, private dateService: DateService) {
        this.dateService.currentDate.subscribe(actualDay => {
            this.actualDay = actualDay;
            this.getWorkDays();
        });
    }

    createMonth(workDay: WorkDay[]): void {
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
                    oneWeek.days.push(this.setDay(selectedYear, selectedMonth + 1, dayOfMonth, workDay));
                    dayOfMonth++;
                } else {
                    oneWeek.days.push(otherMonth);
                }
            }

            this.month.push(oneWeek);
        }
    }

    setDay(year: number, month: number, day: number, workDays: WorkDay[]): Day {
        let date = year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day);
        let newDay: Day;

        for (let workDay of workDays) {

            if (workDay.actualDay === date) {
                newDay = new Day('workday', year, month, day);
                newDay.extraMinutes = workDay.sumPerDay - workDay.requiredMinPerDay;
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

    // nem jo nev, valami kifejezobbet talalni ki
    getWorkDays(): void {
        this.httpService.getMonthsData(this.actualDay.getFullYear(), this.actualDay.getMonth()).subscribe(workDays => {
            this.createMonth(workDays);
            // this.monthSource.next(this.month);
            this.getMonthlyStats();
        });
    }

    getMonthlyStats(): void {
        this.httpService.getMonthlyStats(this.actualDay.getFullYear(), this.actualDay.getMonth()).subscribe(workMonth => {
            this.saveMonthlyStats(workMonth[0]);
        });
    }

    // hogy lehetne kihagyni, es sporolni 3 fieldet
    saveMonthlyStats(workMonth: WorkMonth): void {
        this.sumPerMonth = workMonth.sumPerMonth;
        this.requiredMinPerMonth = workMonth.requiredMinPerMonth;
        this.extraMinPerMonth = workMonth.extraMinPerMonth;
    }

    activateDay(requiredMinPerDay: number): void {
        console.log('calendar service: ' + requiredMinPerDay);
        this.httpService
            .activateDay(this.dateService.selectedDay.year,
                this.dateService.selectedDay.month,
                this.dateService.selectedDay.day,
                requiredMinPerDay)
            .subscribe(
                () => this.getWorkDays(),
                error => this.handleError(error, requiredMinPerDay),

        );
    }

    private handleError(error: HttpErrorResponse, requiredMinPerDay: number) {
        if (error.status === 302) {
            if (confirm('Do you want to activate weekend day?')) {
                this.activateWeekend(requiredMinPerDay);
            }
        }
    }

    activateWeekend(requiredMinPerDay: number): void {

        this.httpService.activateWeekendDay(this.dateService.selectedDay.year,
            this.dateService.selectedDay.month,
            this.dateService.selectedDay.day,
            requiredMinPerDay)
            .subscribe(() => this.getWorkDays());
    }

}
