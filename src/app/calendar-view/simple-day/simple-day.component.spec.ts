import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDayComponent } from './simple-day.component';
import { DateService } from '../../shared/services/date.service';
import { Day } from '../../shared/classes/day';

describe('SimpleDayComponent', () => {
  let component: SimpleDayComponent;
  let fixture: ComponentFixture<SimpleDayComponent>;
  let dateServiceSpy: jasmine.SpyObj<DateService>;
  let expectedDay: Day;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DateService', ['setSelectedDay']);
    TestBed.configureTestingModule({
      declarations: [SimpleDayComponent],
      providers: [{ provide: DateService, useValue: spy }]
    });

    fixture = TestBed.createComponent(SimpleDayComponent);
    dateServiceSpy = TestBed.get(DateService);
    component = fixture.componentInstance;

    expectedDay = new Day('simple-day', 3030, 1, 1);
    component.day = expectedDay;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #DateService.setSelectedDay', () => {
    component.setSelectedDay();
    expect(dateServiceSpy.setSelectedDay).toHaveBeenCalledWith(expectedDay);
  });

  it('should display the day', () => {
    const displayedElement: HTMLElement = fixture.debugElement.nativeElement;
    const displayedDay = displayedElement.querySelector('a');
    fixture.detectChanges();

    expect(displayedDay.textContent.trim()).toBe('1');
  });
});

