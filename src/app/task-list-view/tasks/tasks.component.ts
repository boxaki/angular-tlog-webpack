import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
// import { DateService } from '../../shared/services/date.service';

@Component({
    selector: 'my-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    constructor(public tasksService: TasksService) { }

    ngOnInit() {
    }

}
