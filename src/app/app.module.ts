import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { LoginComponent } from './login/login.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { TaskListViewComponent } from './task-list-view/task-list-view.component';
import { PagerComponent } from './calendar-view/pager/pager.component';
import { WeekComponent } from './calendar-view/week/week.component';
import { SimpleDayComponent } from './calendar-view/simple-day/simple-day.component';
import { WorkDayComponent } from './calendar-view/work-day/work-day.component';
import { MonthlyStatsComponent } from './calendar-view/monthly-stats/monthly-stats.component';
import { ActivateDayComponent } from './calendar-view/activate-day/activate-day.component';
import { TasksComponent } from './task-list-view/tasks/tasks.component';
import { TaskComponent } from './task-list-view/tasks/task/task.component';
import { DailyStatsComponent } from './task-list-view/daily-stats/daily-stats.component';
import { EditTaskComponent } from './task-list-view/edit-task/edit-task.component';
import { NewTaskComponent } from './task-list-view/new-task/new-task.component';

import { DateService } from './shared/services/date.service';
import { HttpService } from './shared/services/http.service';
import { CalendarService } from './shared/services/calendar.service';
import { TasksService } from './shared/services/tasks.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { HttpErrorInterceptor } from './shared/services/httpError.interceptor';
import { AuthTokenService } from './shared/services/authToken.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    CalendarViewComponent,
    TaskListViewComponent,
    PagerComponent,
    WeekComponent,
    SimpleDayComponent,
    WorkDayComponent,
    MonthlyStatsComponent,
    ActivateDayComponent,
    TasksComponent,
    TaskComponent,
    DailyStatsComponent,
    EditTaskComponent,
    NewTaskComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    ApiService,
    DateService,
    HttpService,
    CalendarService,
    TasksService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    AuthTokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) { }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
