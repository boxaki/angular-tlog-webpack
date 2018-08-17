import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../shared/services/tasks.service';
import { DateService } from '../../shared/services/date.service';

import { ModifyTaskRB } from '../../shared/classes/modifyTaskRB';
import { Task } from '../../shared/classes/task';
import { DeleteTaskRB } from '../../shared/classes/deleteTaskRB';

@Component({
  selector: 'my-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskId: string;
  comment: string;
  startTime: string;
  endTime: string;

  selectedTask: Task = {
    taskId: '0000',
    startTime: '',
    endTime: '',
    comment: '',
    minPerTask: 0
  };

  constructor(public tasksService: TasksService, private dateService: DateService) { }

  ngOnInit() {
    if (this.tasksService.selectedTask) {
      this.selectedTask = this.tasksService.selectedTask;
    }
  }

  modifyTask() {
    console.log('modify task edit');

    // dateService -> itt letre lehet hozni a modified taskot, es a service-ben mar csak tovabb kell adni
    let modifiedTask: ModifyTaskRB = {
      year: this.dateService.selectedDay.year,
      month: this.dateService.selectedDay.month,
      day: this.dateService.selectedDay.day,
      taskId: this.tasksService.selectedTask.taskId,
      startTime: this.tasksService.selectedTask.startTime,
      newTaskId: this.taskId ? this.taskId : this.tasksService.selectedTask.taskId,
      newStartTime: this.startTime ? this.startTime : this.tasksService.selectedTask.startTime,
      newEndTime: this.endTime ? this.endTime : this.tasksService.selectedTask.endTime,
      newComment: this.comment ? this.comment : this.tasksService.selectedTask.comment
    };

    this.tasksService.modifyTask(modifiedTask);
  }

  deleteTask() {
    if (confirm('Are you sure to delete task ?')) {

      let taskToDelete: DeleteTaskRB = {
        year: this.dateService.selectedDay.year,
        month: this.dateService.selectedDay.month,
        day: this.dateService.selectedDay.day,
        taskId: this.taskId ? this.taskId : this.tasksService.selectedTask.taskId,
        startTime: this.startTime ? this.startTime : this.tasksService.selectedTask.startTime
      };
      console.log('task to delete: ' + taskToDelete.startTime);

      this.tasksService.deleteTask(taskToDelete);
    }
  }

}
