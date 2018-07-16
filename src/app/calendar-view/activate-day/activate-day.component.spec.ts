import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDayComponent } from './activate-day.component';

describe('ActivateDayComponent', () => {
  let component: ActivateDayComponent;
  let fixture: ComponentFixture<ActivateDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
