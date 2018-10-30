import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

import { HttpService } from './http.service';

import {
    testTask1, testTask2, testDay2, testDays, testMonth1, testMonths, testWorkDayRB, testStartTaskRB,
    testFinishTaskRB, testModifyTaskRB, testDeleteTaskRB
} from '../test/test-data';

describe('HttpService', () => {
    let httpMock: HttpTestingController;
    let httpService: HttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HttpService
            ]
        });

        httpService = TestBed.get(HttpService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(httpService).toBeTruthy();
    });

    it('should test getMonthsData', () => {

        httpService.getMonthsData(2020, 11)
            .subscribe(res => {
                expect(res).toEqual(testDays);
            });

        httpMock.expectOne({
            url: 'http://localhost:9080/timelogger/workmonths/2020/11',
            method: 'GET'
        }).flush(testDays);
    });

    it('should test getMonthlyStats', () => {

        httpService.getMonthlyStats(2020, 11)
            .subscribe(res => {
                expect(res).toEqual(testMonth1);
            });

        httpMock.expectOne({
            url: 'http://localhost:9080/timelogger/workmonths',
            method: 'GET'
        }).flush(testMonths);
    });

    it('should test getDailyStats', async(() => {

        httpService.getDailyStats(2020, 11, 12).skip(1).subscribe(res => {
            expect(res).toEqual(testDay2);
        });

        httpMock.expectOne({
            url: 'http://localhost:9080/timelogger/workmonths/2020/11',
            method: 'GET'
        }).flush(testDays);
    }));

    const responseWorkDay = testDay2;

    it('should test activateDay', () => {
        let newDay = testWorkDayRB;

        httpService.activateDay(newDay).subscribe(res => {
            expect(res).toEqual(responseWorkDay);
        });

        httpMock.expectOne({
            url: 'http://localhost:9080/timelogger/workmonths/workdays',
            method: 'POST'
        }).flush(responseWorkDay);
    });

    it('should test activateWeekendDay', () => {
        let newDay = testWorkDayRB;

        httpService.activateWeekendDay(newDay).subscribe(res => {
            expect(res).toEqual(responseWorkDay);
        });

        httpMock.expectOne((request: HttpRequest<any>) => {
            return request.method === 'POST' &&
                request.url === 'http://localhost:9080/timelogger/workmonths/weekends' &&
                request.headers.get('Content-Type') === 'application/json' &&
                request.body === newDay;
        }).flush(responseWorkDay);
    });

    it('should test startNewTask', () => {
        const newTask = testStartTaskRB;
        const response = testTask1;

        httpService.startNewTask(newTask).subscribe(res => {
            expect(res).toEqual(response);
        });

        httpMock.expectOne((request: HttpRequest<any>) => {
            return request.method === 'POST' &&
                request.url === 'http://localhost:9080/timelogger/workmonths/workdays/tasks/start' &&
                request.headers.get('Content-Type') === 'application/json' &&
                request.body === newTask;
        }).flush(response);
    });

    it('should test finishNewTask', () => {
        const task = testFinishTaskRB;
        const response = testTask1;

        httpService.finishTask(task).subscribe(res => {
            expect(res).toEqual(response);
        });

        httpMock.expectOne((request: HttpRequest<any>) => {
            return request.method === 'PUT' &&
                request.url === 'http://localhost:9080/timelogger/workmonths/workdays/tasks/finish' &&
                request.headers.get('Content-Type') === 'application/json' &&
                request.body === task;
        }).flush(response);
    });

    it('should test modifyTask', () => {
        const taskToModify = testModifyTaskRB;
        const response = testTask1;

        httpService.modifyTask(taskToModify).subscribe(res => {
            expect(res).toEqual(response);
        });

        httpMock.expectOne((request: HttpRequest<any>) => {
            return request.method === 'PUT' &&
                request.url === 'http://localhost:9080/timelogger/workmonths/workdays/tasks/modify' &&
                request.headers.get('Content-Type') === 'application/json' &&
                request.body === taskToModify;
        }).flush(response);
    });

    it('should test deleteTask', () => {
        const taskToDelete = testDeleteTaskRB;
        const response = testTask1;

        httpService.deleteTask(taskToDelete).subscribe(res => {
            expect(res).toEqual(response);
        });

        httpMock.expectOne((request: HttpRequest<any>) => {
            return request.method === 'PUT' &&
                request.url === 'http://localhost:9080/timelogger/workmonths/workdays/tasks/delete' &&
                request.headers.get('Content-Type') === 'application/json' &&
                request.body === taskToDelete;
        }).flush(response);
    });

    it('should test getTasksOfDay', () => {

        httpService.getTasksOfDay(2020, 11, 12).subscribe(res => {
            expect(res).toEqual([testTask1, testTask2]);
        });

        httpMock.expectOne('http://localhost:9080/timelogger/workmonths/2020/11/12')
            .flush([testTask1, testTask2]);
    });

});
