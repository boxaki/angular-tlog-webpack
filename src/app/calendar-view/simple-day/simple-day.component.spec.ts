import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDayComponent } from './simple-day.component';

describe('SimpleDayComponent', () => {
  let component: SimpleDayComponent;
  let fixture: ComponentFixture<SimpleDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
