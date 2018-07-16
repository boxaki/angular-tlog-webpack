import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

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
import { DailyStatsComponent } from './task-list-view/daily-stats/daily-stats.component';
import { EditTaskComponent } from './task-list-view/edit-task/edit-task.component';

import { DateService } from './shared/services/date.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
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
    DailyStatsComponent,
    EditTaskComponent
  ],
  providers: [
    ApiService,
    DateService
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
