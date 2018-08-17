import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../../shared/classes/task';

import { TasksService } from '../../../shared/services/tasks.service';

@Component({
    selector: '[my-task]',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    @Input() task: Task;

    constructor(private tasksService: TasksService) { }

    ngOnInit() {
    }

    setSelectedTask() {
        console.log('select task');
        this.tasksService.setSelectedTask(this.task);
    }

}
