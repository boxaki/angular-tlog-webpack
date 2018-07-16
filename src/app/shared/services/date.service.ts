import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService {
    now: Date = new Date();
    private dateSource = new BehaviorSubject(this.now);
    currentDate = this.dateSource.asObservable();
    actualDate: Date;

    constructor() {
        this.setActualDate(this.now);
    }

    public setActualDate(date: Date): void {
        this.dateSource.next(date);
    }

    public setNow(): void {
        this.now = new Date();
    }

}
