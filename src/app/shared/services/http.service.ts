import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from '../classes/task';
import { WorkDay } from '../classes/workDay';
import { WorkMonth } from '../classes/workMonth';
import { User } from '../classes/user';

import { WorkDayRB } from '../classes/workDayRB';
import { StartTaskRB } from '../classes/startTaskRB';
import { ModifyTaskRB } from '../classes/modifyTaskRB';
import { FinishTaskRB } from '../classes/finishTaskRB';
import { DeleteTaskRB } from '../classes/deleteTaskRB';
import { UserRB } from '../classes/userRB';

@Injectable()
export class HttpService {
    private backendUrl = 'http://localhost:9080/timelogger';

    constructor(private http: HttpClient) { }

    /**
     * Gets the workdays for the selected month with all the details.
     * @param year
     * @param month 1-12
     */
    public getMonthsData(year: number, month: number): Observable<WorkDay[]> { // át kéne nevezni, get workdays v vmi hasonlo
        const url = `${this.backendUrl}/workmonths/${year}/${month}`;

        return this.http.get<WorkDay[]>(url, { headers: this.getHeaders() });
    }

    /**
     * Gets the selected month's details with the backend calculated statistics.
     * @param year
     * @param month 1-12
     */
    public getMonthlyStats(year: number, month: number): Observable<WorkMonth> {
        let date = year + '-' + (month < 10 ? '0' + month : month);
        const url = `${this.backendUrl}/workmonths`;

        return this.http.get<WorkMonth[]>(url, { headers: this.getHeaders() })
            .map(days => days.find(day => day.date === date));
    }

    /**
     * Gets the selected day's details that contain the daily statistics.
     * @param year
     * @param month 1-12
     * @param day
     */
    getDailyStats(year: number, month: number, day: number): Observable<WorkDay> { // v létrehozni dailystats interface-t
        let date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);

        return this.getMonthsData(year, month)
            .map(days => days.find(workDay => workDay.actualDay === date));
    }

    /**
     * Sets the required work minutes for a selected weekday.
     * @param newDay the new workday's details
     */
    activateDay(newDay: WorkDayRB): Observable<WorkDay> {
        const url = `${this.backendUrl}/workmonths/workdays`;

        return this.http.post<WorkDay>(url, newDay, { headers: this.getHeaders() });
    }

    /**
     * Sets the required work minutes for a selected weekend day.
     * @param weekendDay the new workday's details
     */
    activateWeekendDay(weekendDay: WorkDayRB) {
        const url = `${this.backendUrl}/workmonths/weekends`;

        return this.http.post<WorkDay>(url, weekendDay, { headers: this.getHeaders() });
    }

    /**
     * Gets the tasks for a selected day.
     * @param year
     * @param month 1-12
     * @param day
     */
    getTasksOfDay(year: number, month: number, day: number): Observable<Task[]> {
        const url = `${this.backendUrl}/workmonths/${year}/${month}/${day}`;

        return this.http.get<Task[]>(url, { headers: this.getHeaders() });
    }

    /**
     * Start a new task.
     * @param newTask
     */
    startNewTask(newTask: StartTaskRB): Observable<Task> { // nev -> startTask?
        const url = `${this.backendUrl}/workmonths/workdays/tasks/start`;

        return this.http.post<Task>(url, newTask, { headers: this.getHeaders() });
    }

    /**
     * Posts the necessary details to finish an unfinished task.
     * @param finishedTask
     */
    finishTask(finishedTask: FinishTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/finish`;

        return this.http.put<Task>(url, finishedTask, { headers: this.getHeaders() });
    }

    /**
     * Modifies an existing task.
     * @param modifiedTask
     */
    modifyTask(modifiedTask: ModifyTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/modify`;

        return this.http.put<Task>(url, modifiedTask, { headers: this.getHeaders() });
    }

    /**
     * Deletes a task.
     * @param taskToDelete
     */
    deleteTask(taskToDelete: DeleteTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/delete`;

        return this.http.put<Task>(url, taskToDelete, { headers: this.getHeaders() });
    }

    login(user: UserRB): Observable<HttpResponse<User>> {
        const url = `${this.backendUrl}/login`;

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.post<any>(url, user, { headers: headers, observe: 'response' });
    }

    register(user: UserRB): Observable<HttpResponse<Response>> {
        const url = `${this.backendUrl}/register`;

        return this.http.post<any>(url, user, { headers: this.getHeaders(), observe: 'response' });
    }

    refresh(): Observable<HttpResponse<User>> {
        const url = `${this.backendUrl}/refresh`;

        return this.http.get<any>(url, { headers: this.getHeaders(), observe: 'response' });
    }

    private getHeaders() { // httpintercetor kezelje az auth headert

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        let jwt = sessionStorage.getItem('jwt');

        if (jwt) {
            headers = headers.append('Authorization', jwt);
        }

        return headers;
    }

}
