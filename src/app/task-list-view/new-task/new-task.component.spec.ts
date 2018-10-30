import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskComponent } from './new-task.component';
import { TasksService } from '../../shared/services/tasks.service';
import { DateService } from '../../shared/services/date.service';
import { FormsModule } from '@angular/forms';

import { testTask1 } from '../../shared/test/test-data';

export class MockTasksService {
    selectedTask = testTask1;

    addNewTask() { }
    startNewTask() { }
}

export class MockDateService {

    selectedDay = {
        year: 2030,
        month: 4,
        day: 5
    };
}

describe('NewTaskComponent', () => {
    let component: NewTaskComponent;
    let fixture: ComponentFixture<NewTaskComponent>;
    let tasksService: TasksService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [NewTaskComponent],
            providers: [
                { provide: TasksService, useClass: MockTasksService },
                { provide: DateService, useClass: MockDateService }
            ]
        });
        fixture = TestBed.createComponent(NewTaskComponent);
        component = fixture.componentInstance;
        tasksService = TestBed.get(TasksService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call #TaskService.addNewTask', () => {
        component.endTime = '16:30';
        fixture.detectChanges();

        const spy = spyOn(tasksService, 'addNewTask');
        component.addNewTask();
        expect(spy).toHaveBeenCalled();
    });

    it('should call #TaskService.startNewTask', () => {
        component.endTime = '';
        fixture.detectChanges();

        const spy = spyOn(tasksService, 'startNewTask');
        component.addNewTask();
        expect(spy).toHaveBeenCalled();
    });

});
