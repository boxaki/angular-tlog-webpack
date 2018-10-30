import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { TasksService } from '../../../shared/services/tasks.service';

import { testTask1 } from '../../../shared/test/test-data';


describe('Task component', () => {
    let tasksServiceSpy: jasmine.SpyObj<TasksService>;
    let fixture: ComponentFixture<TaskComponent>;
    let component: TaskComponent;
    let tds;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('TasksService', ['setSelectedTask']);

        TestBed.configureTestingModule({
            declarations: [TaskComponent],
            providers: [{ provide: TasksService, useValue: spy }]
        });
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        component.task = testTask1;

        tasksServiceSpy = TestBed.get(TasksService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should call TasksService.setSelectedTask', () => {
        component.setSelectedTask();
        expect(tasksServiceSpy.setSelectedTask).toHaveBeenCalledWith(testTask1);
    });

    beforeEach(() => {
        const nativeElement: HTMLElement = fixture.debugElement.nativeElement;
        tds = nativeElement.querySelectorAll('td');
    });

    it('should display taskId', () => {
        expect(tds[0].textContent).toEqual('' + component.task.taskId);
    });

    it('should display comment', () => {
        expect(tds[1].textContent).toEqual('' + component.task.comment);
    });

    it('should display start time', () => {
        expect(tds[2].textContent).toEqual('' + component.task.startTime);
    });


    it('should display endTime', () => {
        expect(tds[3].textContent).toEqual('' + component.task.endTime);
    });

    it('should display "Not finished"', () => {
        component.task.endTime = component.task.startTime;
        fixture.detectChanges();
        expect(tds[3].textContent).toEqual('Not finished');
    });

    it('should display min per task', () => {
        expect(tds[4].textContent).toEqual('' + component.task.minPerTask);
    });

});
