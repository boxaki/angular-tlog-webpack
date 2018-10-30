import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { Component, Input } from '@angular/core';

import { TasksComponent } from './tasks.component';
import { TasksService } from '../../shared/services/tasks.service';

import { testTasks } from '../../shared/test/test-data';

export class MockTasksService {
  private _tasks = testTasks;
  tasks = of(this._tasks);
}

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  @Component({ selector: '[my-task]', template: '' })
  class TaskStubComponent {
    @Input() task;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksComponent, TaskStubComponent],
      providers: [
        { provide: TasksService, useClass: MockTasksService }
      ]
    });

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tasks', () => {
    const nativeElement: HTMLElement = fixture.debugElement.nativeElement;
    const trs = nativeElement.querySelectorAll('tbody tr');
    expect(trs.length).toBe(testTasks.length + 1);

  });

});
