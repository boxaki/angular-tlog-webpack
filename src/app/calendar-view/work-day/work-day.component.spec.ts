import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WorkDayComponent } from './work-day.component';
// import { DateService } from '../../shared/services/date.service';
import { Day } from '../../shared/classes/day';
import { SelectedDayService } from '../../shared/services/selectedDay.service';

describe('WorkDayComponent', () => {
  let component: WorkDayComponent;
  let expectedDay = new Day('simple-day', 2040, 4, 4);
  let aEl: HTMLElement;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SelectedDayService', ['setSelectedDay']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WorkDayComponent],
      providers: [{ provide: SelectedDayService, useValue: spy }]
    });

    let fixture: ComponentFixture<WorkDayComponent> = TestBed.createComponent(WorkDayComponent);
    component = fixture.componentInstance;

    expectedDay.extraMinutes = 999;
    component.day = expectedDay;

    aEl = fixture.debugElement.nativeElement.querySelector('a');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #DateService.setSelectedDay', () => {
    let dateServiceSpy: jasmine.SpyObj<SelectedDayService> = TestBed.get(SelectedDayService);

    component.setSelectedDay();
    expect(dateServiceSpy.setSelectedDay).toHaveBeenCalledWith(expectedDay);
  });

  it('should display the day of the month', () => {
    expect(aEl.textContent.trim().startsWith('4')).toBe(true);
  });

  it('should display the extra minutes', () => {
    const div = aEl.querySelector('div');
    expect(div.textContent).toBe('999');
  });

  it('should set href to /task-list', () => {
    const href = aEl.getAttribute('href');
    expect(href).toEqual('/task-list');
  });
});
