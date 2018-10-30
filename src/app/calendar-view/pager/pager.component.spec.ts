import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { By } from '@angular/platform-browser';

import { PagerComponent } from './pager.component';
import { DateService } from '../../shared/services/date.service';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export class MockDateService {
  private actualDate = new Date(2020, 10, 1);

  get currentDate() {
    // return fakeAsyncResponse(this.actualDate); // nem mukodik
    return of(this.actualDate);
  }

  setNextMonth() {
    this.actualDate = new Date(1880, 3, 1);
  }

  setPreviousMonth() {
    this.actualDate = new Date(1880, 1, 1);
  }

  setNextYear() {
    this.actualDate = new Date(1881, 2, 1);
  }

  setPreviousYear() {
    this.actualDate = new Date(1879, 2, 1);
  }
};

describe('PagerComponent', () => {
  let component: PagerComponent;
  let dateService: DateService;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagerComponent],
      providers: [{ provide: DateService, useClass: MockDateService }]
    });

    fixture = TestBed.createComponent(PagerComponent);
    dateService = TestBed.get(DateService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mock service should work', () => {
    dateService.currentDate.subscribe(date => {
      expect(date.toDateString()).toBe(new Date(2020, 10, 1).toDateString());
    });
  });

  it('should display the synchronous year', () => {
    fixture.detectChanges();
    const pagerDe: DebugElement = fixture.debugElement;
    const pagerEl: HTMLElement = pagerDe.nativeElement;
    const year = pagerEl.querySelector('#year');
    expect(year.textContent).toBe('2020');
  });

  // async el nem mokodik, csak a sync-el(of)
  xit('should display the async year', fakeAsync(() => {
    // spyOnProperty(dateService, 'currentDate').and.returnValue(fakeAsyncResponse('1800')); // a datum 1970 lesz!
    const pagerDe = fixture.debugElement.query(By.css('#year'));
    const pagerEl: HTMLElement = pagerDe.nativeElement;
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

    expect(pagerEl.textContent).toBe('2020'); // '' toEqual 2020
  }));

  it('should display the synchronous month', () => {
    fixture.detectChanges();
    const pagerDe: DebugElement = fixture.debugElement;
    const pagerEl: HTMLElement = pagerDe.nativeElement;
    const month = pagerEl.querySelector('#month');
    expect(month.textContent).toBe('11');
  });

  it('should call #DateService.setNextMonth()', () => {
    const spy = spyOn(dateService, 'setNextMonth');
    component.setNextMonth();
    expect(spy).toHaveBeenCalled();
  });

  it('should call #DateService.setPreviousMonth()', () => {
    const spy = spyOn(dateService, 'setPreviousMonth');
    component.setPreviousMonth();
    expect(spy).toHaveBeenCalled();
  });

  it('should call #DateService.setNextYear()', () => {
    const spy = spyOn(dateService, 'setNextYear');
    component.setNextYear();
    expect(spy).toHaveBeenCalled();
  });

  it('should call #DateService.setPreviousYear()', () => {
    const spy = spyOn(dateService, 'setPreviousYear');
    component.setPreviousYear();
    expect(spy).toHaveBeenCalled();
  });

});
