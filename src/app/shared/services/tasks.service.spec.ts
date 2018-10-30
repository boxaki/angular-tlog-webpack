import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { defer } from 'rxjs/observable/defer';

import { TasksService } from '../services/tasks.service';
import { HttpService } from '../services/http.service';
import { DateService } from '../services/date.service';
import { Task } from '../classes/task';
import { StartTaskRB } from '../classes/startTaskRB';
import { FinishTaskRB } from '../classes/finishTaskRB';
import { WorkDay } from '../classes/workDay';
import { ModifyTaskRB } from '../classes/modifyTaskRB';
import { DeleteTaskRB } from '../classes/deleteTaskRB';

import {
    testStartTaskRB, testFinishTaskRB, testTask1, testTasks, testDay1, testModifyTaskRB, testDeleteTaskRB, testDay2
} from '../test/test-data';

export function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

export class FakeDateService {
    private actualDate = new Date(2020, 10, 1);
    selectedDay = {
        year: 2020,
        month: 11,
        day: 10
    };

    get currentDate() {
        return fakeAsyncResponse(this.actualDate);
    }
}

export class FakeHttpService {
    getTasksOfDay() {
        return fakeAsyncResponse(testTasks);
    }

    startNewTask() {
        return fakeAsyncResponse(testTask1);
    }

    finishTask() {
        return fakeAsyncResponse(testTask1);
    }

    getDailyStats() {
        return fakeAsyncResponse(testDay2);
    }

    modifyTask() {
        return fakeAsyncResponse(testDay1);
    }

    deleteTask() {
        return fakeAsyncResponse(testDay1);
    }
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let httpService: HttpService;

    const taskToStart: StartTaskRB = testStartTaskRB;
    const taskToFinish: FinishTaskRB = testFinishTaskRB;
    const taskToModify: ModifyTaskRB = testModifyTaskRB;
    const taskToDelete: DeleteTaskRB = testDeleteTaskRB;
    const task1: Task = testTask1;
    const tasks: Task[] = testTasks;
    const testDay: WorkDay = testDay1;


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                TasksService,
                { provide: HttpService, useClass: FakeHttpService },
                { provide: DateService, useClass: FakeDateService }
            ]
        });

        tasksService = TestBed.get(TasksService);
        httpService = TestBed.get(HttpService);
    }));

    it('should be created', () => {
        expect(tasksService).toBeTruthy();
    });

    it('should test loadTasksAndStatsForDay', async(() => {
        const spy = spyOn(httpService, 'getTasksOfDay').and.returnValue(fakeAsyncResponse(tasks));
        tasksService.loadTasksAndStatsOfDay();

        tasksService.tasks.skip(1).subscribe(t => {
            expect(t).toBe(tasks);
        });

        expect(spy).toHaveBeenCalledWith(2020, 11, 10);
    }));

    it('should test addNewTask', fakeAsync(() => {
        spyOn(tasksService, 'getDailyStats').and.returnValue(fakeAsyncResponse([]));
        const startTaskSpy = spyOn(httpService, 'startNewTask').and.returnValue(fakeAsyncResponse(tasks));

        tasksService.addNewTask(taskToStart, taskToFinish);

        expect(startTaskSpy).toHaveBeenCalledWith(taskToStart);
        tick();
        expect(tasksService.tasksChanged).toBe(true);
    }));

    it('should setSelectedTask', fakeAsync(() => {
        tasksService.setSelectedTask(task1);
        expect(tasksService.selectedTask).toBe(task1);
        tick();
        expect(tasksService.tasksChanged).not.toBe(true);
    }));

    it('should modifyTask', fakeAsync(() => {

        const spy = spyOn(httpService, 'modifyTask').and.returnValue(fakeAsyncResponse(task1));
        tasksService.modifyTask(taskToModify);
        expect(spy).toHaveBeenCalledWith(taskToModify);
        tick();
        expect(tasksService.tasksChanged).toBe(true);
    }));

    it('should startNewTask', fakeAsync(() => {
        const spy = spyOn(httpService, 'startNewTask').and.returnValue(fakeAsyncResponse(task1));
        tasksService.startNewTask(taskToStart);
        expect(spy).toHaveBeenCalledWith(taskToStart);
        tick();
        expect(tasksService.tasksChanged).toBe(true);
    }));

    it('should deleteTask', fakeAsync(() => {
        const spy = spyOn(httpService, 'deleteTask').and.returnValue(fakeAsyncResponse(task1));
        tasksService.deleteTask(taskToDelete);
        expect(spy).toHaveBeenCalledWith(taskToDelete);
        tick();
        expect(tasksService.tasksChanged).toBe(true);
    }));

    it('should getDailyStats', fakeAsync(() => {
        const spy = spyOn(httpService, 'getDailyStats').and.returnValue(fakeAsyncResponse(testDay));

        tasksService.getDailyStats(2020, 11, 11);

        expect(spy).toHaveBeenCalledWith(2020, 11, 11);
        tick();
        expect(tasksService.workDayForStats).toBe(testDay);
    }));

    it('should setTaskNotChanged', () => {
        tasksService.tasksChanged = true;
        tasksService.setTasksNotChanged();
        expect(tasksService.tasksChanged).toBe(false);

    });

});
