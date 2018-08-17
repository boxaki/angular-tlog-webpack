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
  // selectedYear: number;


  constructor(private tasksService: TasksService, private dateService: DateService) { }

  ngOnInit() {
    // this.selectedYear = this.dateService.selectedDay.year;
    console.log('new-task on init');
  }

  addNewTask(): void {

    console.log('end time: ' + this.endTime);
    let startTaskRB: StartTaskRB = {
      year: this.dateService.selectedDay.year,
      month: this.dateService.selectedDay.month,
      day: this.dateService.selectedDay.day,
      taskId: this.taskId,
      comment: this.comment,
      startTime: this.startTime
    };

    if (this.endTime.trim().length !== 0) {

      // finishTaskRB = startTaskRB ? v vmi hasonlo rovidites
      let finishTaskRB: FinishTaskRB = {
        year: startTaskRB.year,
        month: startTaskRB.month,
        day: startTaskRB.day,
        taskId: startTaskRB.taskId,
        startTime: startTaskRB.startTime,
        endTime: this.endTime
      };

      this.tasksService.addNewTask(startTaskRB, finishTaskRB);

    } else {
      this.tasksService.startNewTask(startTaskRB);
    }
  }

}
