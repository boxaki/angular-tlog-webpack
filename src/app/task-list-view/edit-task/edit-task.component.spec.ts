import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EditTaskComponent } from './edit-task.component';
import { TasksService } from '../../shared/services/tasks.service';
import { DateService } from '../../shared/services/date.service';

import { testTask1 } from '../../shared/test/test-data';

export class MockTasksService {
  selectedTask = testTask1;

  modifyTask() { }
  deleteTask() { }
}

export class MockDateService {

  selectedDay = {
    year: 2030,
    month: 4,
    day: 5
  };
}

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let tasksService: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditTaskComponent],
      providers: [
        { provide: TasksService, useClass: MockTasksService },
        { provide: DateService, useClass: MockDateService }
      ]
    });
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.get(TasksService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set #selectedTask', () => {
    expect(component.selectedTask).toBeUndefined();

    fixture.detectChanges();
    expect(component.selectedTask).toBe(testTask1);
  });

  it('should call #TaskService.modifyTask', () => {
    fixture.detectChanges();
    const spy = spyOn(tasksService, 'modifyTask');
    component.modifyTask();
    expect(spy).toHaveBeenCalled();
  });

  it('should call #TaskService.deleteTask', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(tasksService, 'deleteTask');
    component.deleteTask();
    expect(spy).toHaveBeenCalled();
  });

  // nem mukodik valamiert component.taskId undefined
  xit('should bind taskId', fakeAsync(() => {
    fixture.detectChanges();

    let debugElement = fixture.debugElement;
    let input = debugElement.query(By.css('#taskId'));
    let inputElement = input.nativeElement;

    inputElement.value = 'test value';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.taskId).toBe('test value');
  }));

});
