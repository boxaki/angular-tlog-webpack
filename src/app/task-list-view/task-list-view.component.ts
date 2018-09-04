import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'my-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

  constructor(public tasksService: TasksService) { }

  /**
   * Updates the view when task-list-view is selected.
   */
  ngOnInit() {
    this.tasksService.loadTasksAndStatsOfDay();
  }

}
