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
    // selectedDate: Date; // kivenni innet, meghagyni a calendar service-ben, ugy hivni, mint az activateDay-t
    private backendUrl = 'http://localhost:9080/timelogger';

    constructor(private http: HttpClient) { } // , private dateService: DateService) { }

    getMonthsData(year: number, month: number): Observable<WorkDay[]> {
        const url = `${this.backendUrl}/workmonths/${year}/${month + 1}`;

        /*
        rendezze az observable/tombot datum szerint, egyszerubb lenne az osszehasonlitas
        vagy/es akkora meretu tombot adjon vissza, amekkora a honap, undefinedekkel az inaktiv napokon
        */

        return this.http.get<WorkDay[]>(url);
    }

    // atirni, hogy a hivas helyen adjon hozza +1 et, vagy Date-et adjon at
    getMonthlyStats(year: number, month: number): Observable<WorkMonth[]> {
        month++;
        let date = year + '-' + (month < 10 ? '0' + month : month);
        console.log('date: ' + date);
        const url = `${this.backendUrl}/workmonths`;

        return this.http.get<WorkMonth[]>(url).map(days => days.filter(day => day.date === date));
    }

    // inkabb hivja a getMonthsData-t, a kulonbseg az url ben a month + 1
    getDailyStats(year: number, month: number, day: number): Observable<WorkDay[]> {
        const url = `${this.backendUrl}/workmonths/${year}/${month}`;
        // fuggvenyt csinalni belole, lehetoleg valtozo parameteres, ami letrehozza a date-ets
        let date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
        // console.log('date' + date);

        return this.http.get<WorkDay[]>(url).map(days => days.filter(workDay => workDay.actualDay === date));

    }

    activateDay(year: number, month: number, day: number, requiredMinPerDay: number): Observable<WorkDay> {
        console.log('http service: ' + requiredMinPerDay);
        let newDay: WorkDayRB = { // ne itt hozza letre, hanem a calendar-ban, egyszerubb lenne a signature
            year: year,
            month: month,
            day: day,
            requiredMinPerDay: requiredMinPerDay
        };

        const url = `${this.backendUrl}/workmonths/workdays`;

        return this.http.post<WorkDay>(url, newDay, httpOptions);
    }

    activateWeekendDay(year: number, month: number, day: number, requiredMinPerDay: number) {
        const url = `${this.backendUrl}/workmonths/weekends`;
        let weekendDay: WorkDayRB = { // ne itt hozza letre, hanem a calendar-ban, egyszerubb lenne a signature
            year: year,
            month: month,
            day: day,
            requiredMinPerDay: requiredMinPerDay
        };

        return this.http.post<WorkDay>(url, weekendDay, httpOptions);
    }

    getTasksOfDay(year: number, month: number, day: number): Observable<Task[]> {
        const url = `${this.backendUrl}/workmonths/${year}/${month + 1}/${day}`;

        return this.http.get<Task[]>(url).map((task) => task.sort(this.compareTimes));
    }

    private compareTimes(a: Task, b: Task): number {
        if (parseInt(a.startTime.split(':')[0], 10) - parseInt(b.startTime.split(':')[0], 10) === 0) {
            return parseInt(a.startTime.split(':')[1], 10) - parseInt(b.startTime.split(':')[1], 10);
        } else {
            return parseInt(a.startTime.split(':')[0], 10) - parseInt(b.startTime.split(':')[0], 10);
        }

    }



    startNewTask(newTask: StartTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/start`;

        return this.http.post<Task>(url, newTask, httpOptions);
    }

    finishTask(finishedTask: FinishTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/finish`;

        return this.http.put<Task>(url, finishedTask, httpOptions);
    }

    modifyTask(modifiedTask: ModifyTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/modify`;

        return this.http.put<Task>(url, modifiedTask, httpOptions);
    }

    deleteTask(taskToDelete: DeleteTaskRB): Observable<Task> {
        const url = `${this.backendUrl}/workmonths/workdays/tasks/delete`;

        return this.http.put<Task>(url, taskToDelete, httpOptions);
    }
}
