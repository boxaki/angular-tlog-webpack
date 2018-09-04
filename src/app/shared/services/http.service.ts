import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from '../classes/task';
import { WorkDay } from '../classes/workDay';
import { WorkMonth } from '../classes/workMonth';
import { WorkDayRB } from '../classes/workDayRB';
import { StartTaskRB } from '../classes/startTaskRB';
import { ModifyTaskRB } from '../classes/modifyTaskRB';
import { FinishTaskRB } from '../classes/finishTaskRB';
import { DeleteTaskRB } from '../classes/deleteTaskRB';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {
    private backendUrl = 'http://localhost:9080/timelogger';

    constructor(private http: HttpClient) { }

    /**
     * Gets the workdays for the selected month with all the details.
     * @param year
     * @param month 1-12
     */
    public getMonthsData(year: number, month: number): Observable<WorkDay[]> {
        const url = `${this.backendUrl}/workmonths/${year}/${month}`;

        return this.http.get<WorkDay[]>(url);
    }

    /**
     * Gets the selected month's details with the calculated statistics.
     * @param year
     * @param month 1-12
     */
    public getMonthlyStats(year: number, month: number): Observable<WorkMonth> {
        let date = year + '-' + (month < 10 ? '0' + month : month);
        const url = `${this.backendUrl}/workmonths`;

        return this.http.get<WorkMonth[]>(url)
            .map(days => days.filter(day => day.date === date))
            .map(workMonth => workMonth[0]);
    }

    /**
     * Gets the selected day's details that contain the daily statistics.
     * @param year
     * @param month 1-12
     * @param day
     */
    getDailyStats(year: number, month: number, day: number): Observable<WorkDay> {
        let date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

        return this.getMonthsData(year, month)
            .map(days => days.filter(workDay => workDay.actualDay === date))
            .map(workDays => workDays[0]);
    }

    /**
     * Sets the required work minutes for a selected weekday.
     * @param newDay the new workday's details
     */
    activateDay(newDay: WorkDayRB): Observable<WorkDay> {
        const url = `${this.backendUrl}/workmonths/workdays`;

        return this.http.post<WorkDay>(url, newDay, httpOptions);
    }

    /**
     * Sets the required work minutes for a selected weekend day.
     * @param weekendDay the new workday's details
     */
    activateWeekendDay(weekendDay: WorkDayRB) {
        const url = `${this.backendUrl}/workmonths/weekends`;

        return this.http.post<WorkDay>(url, weekendDay, httpOptions);
    }

    /**
     * Gets the tasks for a selected day.
     * @param year
     * @param month 1-12
     * @param day
     */
    getTasksOfDay(year: number, month: number, day: number): Observable<Task[]> {
        const url = `${this.backendUrl}/workmonths/${year}/${month}/${day}`;

        return this.http.get<Task[]>(url);
    }

    /**
     * Start a new task.
     * @param newTask
     */
    startNewTask(newTask: StartTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/start`;

        return this.http.post<Task>(url, newTask, httpOptions);
    }

    /**
     * Posts the necessary details to finish an unfinished task.
     * @param finishedTask
     */
    finishTask(finishedTask: FinishTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/finish`;

        return this.http.put<Task>(url, finishedTask, httpOptions);
    }

    /**
     * Modifies an existing task.
     * @param modifiedTask
     */
    modifyTask(modifiedTask: ModifyTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/modify`;

        return this.http.put<Task>(url, modifiedTask, httpOptions);
    }

    /**
     * Deletes a task.
     * @param taskToDelete
     */
    deleteTask(taskToDelete: DeleteTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/delete`;

        return this.http.put<Task>(url, taskToDelete, httpOptions);
    }
}
