import { Component, OnInit } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';
import { SelectedDayService } from '../shared/services/selectedDay.service';

@Component({
  selector: 'my-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {
  selectedDate: Date;

  constructor(private tasksService: TasksService, public selectedDayService: SelectedDayService) { }

  /**
   * Updates the view when task-list-view is selected.
   */
  ngOnInit() {
    this.tasksService.loadTasksAndStatsOfDay();
    this.selectedDate = this.selectedDayService.selectedDay;
  }

}
