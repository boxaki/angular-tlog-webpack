import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    tasksOfDay = [
        { id: 1234, comment: 'yes comment', startTime: '08:00', endTime: '10:00', minPerTask: '120' },
        { id: 1235, comment: 'no comment', startTime: '10:00', endTime: '11:00', minPerTask: '60' },
        { id: 1236, comment: 'comet', startTime: '11:00', endTime: '12:00', minPerTask: '60' },
        { id: 1237, comment: 'commend', startTime: '12:15', endTime: '13:30', minPerTask: '75' },
        { id: 1238, comment: 'common', startTime: '13:30', endTime: '15:00', minPerTask: '90' },
        { id: 1239, comment: 'cement', startTime: '15:00', endTime: '16:00', minPerTask: '60' }
    ];

    constructor() { }

    ngOnInit() {
    }

}
