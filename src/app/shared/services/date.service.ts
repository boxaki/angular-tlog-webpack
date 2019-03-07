import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService {

    private actualDate: Date = new Date();  // atrakni a constructorba
    private dateSource = new BehaviorSubject(this.actualDate);

    get currentDate() {
        return this.dateSource.asObservable();
    }

    constructor() {
        this.actualDate.setDate(1);
    }

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

    public setNow() { // refactor: constructor
        let now = new Date();
        now.setDate(1);
        this.setActualDate(new Date());
    }
}
