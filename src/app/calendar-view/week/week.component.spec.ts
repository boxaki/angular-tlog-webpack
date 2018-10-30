import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { WeekComponent } from './week.component';

import { testWeek } from '../../shared/test/test-data';

describe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;
  let tds;

  @Component({
    selector: 'my-simple-day',
    template: 'Mock Simple Day'
  })
  class SimpleDayStubComponent {
    @Input() day: any;
  }

  @Component({
    selector: 'my-work-day',
    template: 'Mock Work Day'
  })
  class WorkDayStubComponent {
    @Input() day: any;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekComponent, SimpleDayStubComponent, WorkDayStubComponent],
      providers: [WeekComponent]
    });

    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    component.week = testWeek;
    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.debugElement.nativeElement;
    tds = nativeElement.querySelectorAll('td');
  });

  it('should generate all td elements', () => {
    expect(tds.length).toBe(7);
  });

  it('should set the attribute', () => {
    expect(tds[0].attributes['ng-reflect-ng-class'].value).toBe('other-month');
    expect(tds[1].attributes[0].value).toBe('');
  });

  it('should set element selectors', () => {
    fixture.detectChanges();
    const nativeElement: HTMLElement = fixture.debugElement.nativeElement;
    expect(nativeElement.querySelectorAll('my-simple-day').length).toBe(2);
    expect(nativeElement.querySelectorAll('my-work-day').length).toBe(4);
  });

});
