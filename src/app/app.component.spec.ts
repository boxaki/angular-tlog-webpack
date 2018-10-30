import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from './shared';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  @Component({ selector: 'my-navigation-bar', template: '' })
  class NavigationBarStubComponent { }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, NavigationBarStubComponent],
      providers: [ApiService, provideRoutes([])]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.url).toEqual('https://github.com/boxaki/angular-tlog-webpack');
  });

});
