import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ActivateDayComponent } from './activate-day.component';
import { CalendarService } from '../../shared/services/calendar.service';

describe('ActivateDayComponent', () => {
  let component: ActivateDayComponent;
  let fixture: ComponentFixture<ActivateDayComponent>;
  let calendarServiceSpy: jasmine.SpyObj<CalendarService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CalendarService', ['activateDay']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ActivateDayComponent],
      providers: [{ provide: CalendarService, useValue: spy }]
    });

    fixture = TestBed.createComponent(ActivateDayComponent);
    calendarServiceSpy = TestBed.get(CalendarService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  // this.unit = form.controls['unit'].value; sornal nem mukodik
  // template driven form test
  xit('should call #CalendarService.activateDay()', () => {
    const testForm = <NgForm>{
      value: {
        time: '420',
        unit: 'min'
      }
    };

    // tick();
    fixture.detectChanges();
    component.activateDay(testForm);
    expect(calendarServiceSpy.activateDay).toHaveBeenCalled();
  });

  xit('should call #CalendarService.activateDay()', () => {
    const requiredTime: HTMLInputElement = fixture.debugElement.query(By.css('input[name=time]')).nativeElement;
    requiredTime.value = '400';

    const okDe = fixture.debugElement.query(By.css('#ok'));
    const okEl: HTMLElement = okDe.nativeElement;

    // okDe.triggerEventHandler('click', null);
    okEl.click();
    fixture.detectChanges();
    expect(calendarServiceSpy.activateDay).toHaveBeenCalled();
  });
});
