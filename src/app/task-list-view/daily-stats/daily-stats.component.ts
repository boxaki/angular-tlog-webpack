import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../shared/services/tasks.service';
// import { DateService } from '../../shared/services/date.service';


@Component({
  selector: 'my-daily-stats',
  templateUrl: './daily-stats.component.html',
  styleUrls: ['./daily-stats.component.scss']
})
export class DailyStatsComponent implements OnInit {

  constructor(public tasksService: TasksService) { }

  ngOnInit() {
  }

}
