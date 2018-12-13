import { RouterModule, Routes } from '@angular/router';

import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { TaskListViewComponent } from './task-list-view/task-list-view.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarViewComponent, canActivate: [AuthGuard] },
  { path: 'task-list', component: TaskListViewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent } // engedje e, ha be van lépve? !canActivate ?
];

export const routing = RouterModule.forRoot(routes);
