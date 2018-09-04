import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { DateService } from '../services/date.service';

import { Task } from '../classes/task';
import { WorkDay } from '../classes/workDay';
import { StartTaskRB } from '../classes/startTaskRB';
import { FinishTaskRB } from '../classes/finishTaskRB';
import { ModifyTaskRB } from '../classes/modifyTaskRB';
import { DeleteTaskRB } from '../classes/deleteTaskRB';

import { BehaviorSubject } from 'rxjs';


@Injectable()
export class TasksService {
    private _tasks: BehaviorSubject<Task[]> = <BehaviorSubject<Task[]>>new BehaviorSubject([]);
    public readonly tasks = this._tasks.asObservable();

    selectedTask: Task;
    workDayForStats: WorkDay;
    tasksChanged = false;

    constructor(private httpService: HttpService, private dateService: DateService) { }

    /**
     * Loads the task and stats for task-list-view. Sorts the tasks by start time.
     */
    loadTasksAndStatsOfDay(): void {
        this.httpService
            .getTasksOfDay(this.dateService.selectedDay.year, this.dateService.selectedDay.month, this.dateService.selectedDay.day)
            .map((tasks) => tasks.sort(this.compareTimes))
            .subscribe(tasksOfDay => {
                this._tasks.next(tasksOfDay);
                this.getDailyStats(this.dateService.selectedDay.year, this.dateService.selectedDay.month, this.dateService.selectedDay.day);
            });
    }

    private compareTimes(a: Task, b: Task): number {
        if (parseInt(a.startTime.split(':')[0], 10) - parseInt(b.startTime.split(':')[0], 10) === 0) {
            return parseInt(a.startTime.split(':')[1], 10) - parseInt(b.startTime.split(':')[1], 10);
        } else {
            return parseInt(a.startTime.split(':')[0], 10) - parseInt(b.startTime.split(':')[0], 10);
        }

    }

    /**
     * Add new task and refreshes the view.
     * @param newTask
     * @param finishNewTask
     */
    addNewTask(newTask: StartTaskRB, finishNewTask: FinishTaskRB): void {
        this.httpService.startNewTask(newTask).flatMap(() =>
            this.httpService.finishTask(finishNewTask)).subscribe(() => {
                this.tasksChanged = true;
                this.loadTasksAndStatsOfDay();
            });
    }

    /**
     * Selects a task for modification/deletion.
     * @param task
     */
    setSelectedTask(task: Task): void {
        this.selectedTask = task;
    }

    /**
     * Modifies a task and refreshes the view.
     * @param modifiedTask
     */
    modifyTask(modifiedTask: ModifyTaskRB): void {
        this.httpService.modifyTask(modifiedTask)
            .subscribe(() => {
                this.tasksChanged = true;
                this.loadTasksAndStatsOfDay();
            });
    }

    /**
     * Statrs a new task without finishing it and refreshes the view.
     * @param newTask
     */
    startNewTask(newTask: StartTaskRB): void {
        this.httpService.startNewTask(newTask).subscribe(() => {
            this.tasksChanged = true;
            this.loadTasksAndStatsOfDay();
        });
    }

    /**
     * Deletes a task and refreshes the view.
     * @param taskToDelete
     */
    deleteTask(taskToDelete: DeleteTaskRB): void {
        this.httpService.deleteTask(taskToDelete).subscribe(() => {
            this.tasksChanged = true;
            this.loadTasksAndStatsOfDay();
        });
    }

    /**
     * Gets the statistics for a workday.
     * @param year
     * @param month
     * @param day
     */
    getDailyStats(year: number, month: number, day: number): void {
        this.httpService.getDailyStats(year, month, day)
            .subscribe(workDay => this.workDayForStats = workDay);
    }

    /**
     * Sets the task to unchanged (default state).
     */
    setTasksNotChanged() {
        this.tasksChanged = false;
    }
}
