import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { DateService } from '../services/date.service';

import { Task } from '../classes/task';
import { WorkDay } from '../classes/workDay';
import { StartTaskRB } from '../classes/startTaskRB';
import { FinishTaskRB } from '../classes/finishTaskRB';
import { ModifyTaskRB } from '../classes/modifyTaskRB';
import { DeleteTaskRB } from '../classes/deleteTaskRB';


@Injectable()
export class TasksService {
    tasksOfDay: Task[];
    selectedTask: Task;
    workDayForStats: WorkDay; // saját service-t csinalni neki ?
    tasksChanged = false;

    constructor(private httpService: HttpService, private dateService: DateService) { // dateService-t atrakni ? -> nem
        // this.getTasksOfDay();
        console.log('construct task service' + dateService.selectedDay.year + ' ' +
            dateService.selectedDay.month + ' ' + dateService.selectedDay.day
        );
    }

    getTasksOfDay(): void {
        this.httpService
            .getTasksOfDay(this.dateService.selectedDay.year, this.dateService.selectedDay.month - 1, this.dateService.selectedDay.day)
            .subscribe(tasksOfDay => {
                this.tasksOfDay = tasksOfDay;
                this.getDailyStats(this.dateService.selectedDay.year, this.dateService.selectedDay.month, this.dateService.selectedDay.day);
            });
    }

    addNewTask(newTask: StartTaskRB, finishTaskRB: FinishTaskRB): void {

        this.httpService.startNewTask(newTask).flatMap(() =>
            this.httpService.finishTask(finishTaskRB)).subscribe(() => {
                this.tasksChanged = true;
                this.getTasksOfDay();
            });
        /*
        a flatMap nelkul ez az utsitas megbolonditja neha a backendet/ servert
        2* el lehet kuldeni ua-t a taskot, anelkul, hogy exc lenne
        az sql neha 500-at dob -> dupla primarykey -> miert ? -> hogyan lehet vele visszaelni,
        hogyan lehet kivedeni ?
        this.httpService.finishTask(finishTaskRB).subscribe(() => {
            this.getTasksOfDay();
            console.log('finished');
        }
        );
        */
    }

    setSelectedTask(task: Task): void {
        this.selectedTask = task;
        console.log('tasksService setSelectedTask' + this.selectedTask);
    }

    modifyTask(modifiedTask: ModifyTaskRB): void {
        console.log('tasksService modifyTask');

        this.httpService.modifyTask(modifiedTask).subscribe(() => {
            this.tasksChanged = true;
            this.getTasksOfDay();
        });
    }

    startNewTask(newTask: StartTaskRB): void {
        this.httpService.startNewTask(newTask).subscribe(() => {
            this.tasksChanged = true;
            this.getTasksOfDay();
        });
    }

    deleteTask(taskToDelete: DeleteTaskRB): void {
        this.httpService.deleteTask(taskToDelete).subscribe(() => {
            this.tasksChanged = true;
            this.getTasksOfDay();
        });
    }

    getDailyStats(year: number, month: number, day: number): void {
        this.httpService.getDailyStats(year, month, day).subscribe(workDay => this.workDayForStats = workDay[0]);
    }

    setTasksNotChanged() {
        this.tasksChanged = false;
    }
}
