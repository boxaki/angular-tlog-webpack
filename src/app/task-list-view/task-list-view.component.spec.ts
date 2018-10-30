import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListViewComponent } from './task-list-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';

describe('TaskListViewComponent', () => {
  let component: TaskListViewComponent;
  let fixture: ComponentFixture<TaskListViewComponent>;
  let taskSeviceSpy: jasmine.SpyObj<TasksService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TasksService', ['loadTasksAndStatsOfDay']);
    TestBed.configureTestingModule({
      declarations: [TaskListViewComponent],
      providers: [
        TaskListViewComponent,
        { provide: TasksService, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(TaskListViewComponent);
    component = fixture.componentInstance;
    taskSeviceSpy = TestBed.get(TasksService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call TasksService.loadTasksAndStatsOfDay in ngOnInit', () => {
    expect(taskSeviceSpy.loadTasksAndStatsOfDay).not.toHaveBeenCalled();
    component.ngOnInit();

    expect(taskSeviceSpy.loadTasksAndStatsOfDay).toHaveBeenCalled();
  });
});
