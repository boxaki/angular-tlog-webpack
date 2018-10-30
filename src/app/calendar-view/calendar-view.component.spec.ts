import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { Component, Input } from '@angular/core';

import { CalendarViewComponent } from './calendar-view.component';
import { Week } from '../shared/classes/week';
import { TasksService } from '../shared/services/tasks.service';
import { CalendarService } from '../shared/services/calendar.service';

import { testWeek } from '../shared/test/test-data';

export class MockTasksService {
  tasksChanged = false;

  setTasksNotChanged(): void {
    this.tasksChanged = true;
  }
}

export class MockCalendarService {
  private month: Week[] = [
    testWeek, testWeek, testWeek, testWeek
  ];

  currentMonth = of(this.month);

  updateCalendarAndStats() { }
}

describe('CalendarViewComponent', () => {
  let component: CalendarViewComponent;
  let fixture: ComponentFixture<CalendarViewComponent>;
  let calendarService: CalendarService;

  @Component({ selector: 'my-pager', template: '' })
  class PagerStubComponent { }

  @Component({ selector: 'my-monthly-stats', template: '' })
  class MonthlyStatsStubComponent { }

  @Component({ selector: 'my-activate-day', template: '' })
  class ActivateDayStubComponent { }

  @Component({ selector: '[my-week]', template: '' })
  class WeekStubComponent {
    @Input() week;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarViewComponent, PagerStubComponent, MonthlyStatsStubComponent, ActivateDayStubComponent, WeekStubComponent
      ],
      providers: [
        { provide: TasksService, useClass: MockTasksService },
        { provide: CalendarService, useClass: MockCalendarService }
      ]
    });
    fixture = TestBed.createComponent(CalendarViewComponent);
    component = fixture.componentInstance;
    calendarService = TestBed.get(CalendarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call 2 methods inside of ngOnInit', () => {
    const tasksService = TestBed.get(TasksService);
    tasksService.tasksChanged = true;

    const updateCalendarAndStats = spyOn(calendarService, 'updateCalendarAndStats');
    const setTasksNotChanged = spyOn(tasksService, 'setTasksNotChanged');

    component.ngOnInit();
    expect(updateCalendarAndStats).toHaveBeenCalled();
    expect(setTasksNotChanged).toHaveBeenCalled();
  });

  it('should display the name of the days', () => {
    const ths = fixture.debugElement.nativeElement.querySelectorAll('th');
    expect(ths[0].textContent).toBe(component.days[0]);
    expect(ths[3].textContent).toBe(component.days[3]);
  });

  it('should display weeks', () => {
    const trs = fixture.debugElement.nativeElement.querySelectorAll('tbody tr');
    expect(trs.length).toBe(4);
  });
});
