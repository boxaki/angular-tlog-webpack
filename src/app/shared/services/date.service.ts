import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DayDate } from '../classes/dayDate';

@Injectable()
export class DateService {

    actualDate: Date = new Date();
    private dateSource = new BehaviorSubject(this.actualDate);
    readonly currentDate = this.dateSource.asObservable();

    selectedDay: DayDate = {
        year: this.actualDate.getFullYear(),
        month: this.actualDate.getMonth() + 1,
        day: this.actualDate.getDate()
    };

    constructor() { }

    /**
     * Sets the date to display to next month
     */
    public setNextMonth(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear(), this.actualDate.getMonth() + 1, 1));
    }

    /**
     * Sets the date to display to the previous month
     */
    public setPreviousMonth(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear(), this.actualDate.getMonth() - 1, 1));
    }

    /**
     * Sets the date to display to the next year
     */
    public setNextYear(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear() + 1, this.actualDate.getMonth(), 1));
    }

    /**
     * Sets the date to display to previous year
     */
    public setPreviousYear(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear() - 1, this.actualDate.getMonth(), 1));
    }

    private setActualDate(date: Date): void {
        this.actualDate = date;
        this.dateSource.next(date);
    }

    /**
     * Selects a day for the activate-day-component and/or for the task-list-view
     * @param selectedDay the day to select
     */
    public setSelectedDay(selectedDay: DayDate): void {
        this.selectedDay = selectedDay;
    }
}
