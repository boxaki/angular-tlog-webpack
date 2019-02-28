import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../shared/services/tasks.service';
import { DateService } from '../../shared/services/date.service';

import { StartTaskRB } from '../../shared/classes/startTaskRB';
import { FinishTaskRB } from '../../shared/classes/finishTaskRB';

@Component({
  selector: 'my-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  taskId: string;
  comment: string;
  startTime: string;
  endTime: string;
  defaultValue = '';

  constructor(private tasksService: TasksService, private dateService: DateService) { }

  ngOnInit() {
  }

  /**
   * Adds a new task or starts it if the end time is empty.
   */
  addNewTask(): void {

    let baseData = {
      year: this.dateService.selectedDay.getFullYear(),
      month: this.dateService.selectedDay.getMonth() + 1,
      day: this.dateService.selectedDay.getDate(),
      taskId: this.taskId,
      startTime: this.startTime
    };

    let startTaskRB: StartTaskRB = {
      ...baseData,
      comment: this.comment,
    };

    if (this.endTime.trim().length !== 0) {

      let finishTaskRB: FinishTaskRB = {
        ...baseData,
        endTime: this.endTime
      };

      this.tasksService.addNewTask(startTaskRB, finishTaskRB);

    } else {
      this.tasksService.startNewTask(startTaskRB);
    }
  }

}
