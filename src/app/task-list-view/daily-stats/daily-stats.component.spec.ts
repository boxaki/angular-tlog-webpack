import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStatsComponent } from './daily-stats.component';
import { TasksService } from '../../shared/services/tasks.service';

import { testDay1 } from '../../shared/test/test-data';
import { DebugElement } from '@angular/core';

export class MockTaskService {
  workDayForStats = testDay1;
}

describe('DailyStatsComponent', () => {
  let component: DailyStatsComponent;
  let fixture: ComponentFixture<DailyStatsComponent>;
  let tds;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyStatsComponent],
      providers: [
        { provide: TasksService, useClass: MockTaskService }
      ]
    });
    fixture = TestBed.createComponent(DailyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    const tdsDe: DebugElement = fixture.debugElement;
    const tdsEl: HTMLElement = tdsDe.nativeElement;
    tds = tdsEl.querySelectorAll('td');
    fixture.detectChanges();
  });

  it('should display required minutes', () => {
    expect(tds[0].textContent.trim()).toBe('' + testDay1.requiredMinPerDay);
  });

  it('should display sum per day', () => {
    expect(tds[1].textContent.trim()).toBe('' + testDay1.sumPerDay);
  });

  it('should display extra minutes per day', () => {
    expect(tds[2].textContent.trim()).toBe('' + testDay1.extraMinPerDay);
  });

  it('should set the td attribute', () => {
    expect(tds[2].attributes['ng-reflect-ng-class'].value).toBe('positive');
  });

});
