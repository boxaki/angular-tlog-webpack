import { Injectable } from '@angular/core';

@Injectable()
export class SelectedDayService {
    selectedDay = new Date();

    /**
    * Selects a day for the activate-day-component and/or for the task-list-view
    * @param selectedDay the day to select
    */
    public setSelectedDay(selectedDay: Date): void {
        this.selectedDay = selectedDay;
    }
}
