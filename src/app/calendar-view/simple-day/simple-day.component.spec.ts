import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDayComponent } from './simple-day.component';
import { Day } from '../../shared/classes/day';
import { SelectedDayService } from '../../shared/services/selectedDay.service';

describe('SimpleDayComponent', () => {
  let component: SimpleDayComponent;
  let fixture: ComponentFixture<SimpleDayComponent>;
  let dateServiceSpy: jasmine.SpyObj<SelectedDayService>;
  let expectedDay: Day;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SelectedDayService', ['setSelectedDay']);
    TestBed.configureTestingModule({
      declarations: [SimpleDayComponent],
      providers: [{ provide: SelectedDayService, useValue: spy }]
    });

    fixture = TestBed.createComponent(SimpleDayComponent);
    dateServiceSpy = TestBed.get(SelectedDayService);
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

