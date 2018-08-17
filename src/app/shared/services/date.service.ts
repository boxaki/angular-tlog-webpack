import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Day } from '../classes/day';

@Injectable()
export class DateService {

    actualDate: Date = new Date();
    private dateSource = new BehaviorSubject(this.actualDate);
    currentDate = this.dateSource.asObservable();

    selectedDay: Day = new Day('',
        this.actualDate.getFullYear(),
        this.actualDate.getMonth() + 1,
        this.actualDate.getDate()
    ); // at kéne e irni Date-re v csinalni SelectedDay-t

    constructor() { }

    public setActualDate(date: Date): void {
        this.actualDate = date;
        this.dateSource.next(date);
    }

    public setNow(): void {
        this.dateSource.next(new Date());
    }

    public setNextMonth(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear(), this.actualDate.getMonth() + 1, 1));
    }

    public setPreviousMonth(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear(), this.actualDate.getMonth() - 1, 1));
    }

    public setNextYear(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear() + 1, this.actualDate.getMonth(), 1));
    }

    public setPreviousYear(): void {
        this.setActualDate(new Date(this.actualDate.getFullYear() - 1, this.actualDate.getMonth(), 1));
    }

    public setSelectedDay(selectedDay): void {
        this.selectedDay = selectedDay;
    }
}
