import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { MonthlyStatsComponent } from './monthly-stats.component';
import { CalendarService } from '../../shared/services/calendar.service';
import { WorkMonth } from '../../shared/classes/workMonth';

import { testMonth1 } from '../../shared/test/test-data';

export class MockCalendarService {
  monthForStats: WorkMonth = testMonth1;
}

describe('MonthlyStatsComponent', () => {
  let component: MonthlyStatsComponent;
  let fixture: ComponentFixture<MonthlyStatsComponent>;
  let tds;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyStatsComponent],
      providers: [{ provide: CalendarService, useClass: MockCalendarService }]
    });

    fixture = TestBed.createComponent(MonthlyStatsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    const monthlyStatsDe: DebugElement = fixture.debugElement;
    const monthlyStatsEl: HTMLElement = monthlyStatsDe.nativeElement;
    tds = monthlyStatsEl.querySelectorAll('tbody tr td');
  });

  it('should display requiredMinPerMonth', () => {
    const requiredMinPerMonth = tds[0];
    expect(requiredMinPerMonth.textContent).toBe('900');
  });

  it('should display sumPerMonth', () => {
    const sumPerMonth = tds[1];
    expect(sumPerMonth.textContent).toBe('930');
  });

  it('should display extraMinPerMonth', () => {
    const extraMinPerMonth = tds[2];
    expect(extraMinPerMonth.textContent.trim()).toBe('30');
  });

  it('should have [ngClass] resolve to "positive"', () => {
    const extraMinPerMonth = tds[2];
    expect(extraMinPerMonth.attributes['ng-reflect-ng-class'].value).toBe('positive');
  });

});
