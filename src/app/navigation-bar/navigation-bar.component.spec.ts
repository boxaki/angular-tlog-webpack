import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigationBarComponent } from './navigation-bar.component';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let aElements;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavigationBarComponent]
    });

    const fixture: ComponentFixture<NavigationBarComponent> = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;

    let nativeElement: HTMLElement = fixture.debugElement.nativeElement;
    aElements = nativeElement.querySelectorAll('a');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test calendar link', () => {
    const href = aElements[0].getAttribute('href');
    expect(href).toEqual('/calendar');
  });

  it('should test task-list link', () => {
    const href = aElements[1].getAttribute('href');
    expect(href).toEqual('/task-list');
  });

  it('should set selectedRoute', () => {
    component.onSelect('makimaki');
    expect(component.selectedRoute).toEqual('makimaki');
  });
});
