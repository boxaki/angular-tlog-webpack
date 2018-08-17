import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
// import { DateService } from '../../shared/services/date.service';

@Component({
    selector: 'my-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    constructor(public tasksService: TasksService) { console.log('construct tasks'); } // , private dateService: DateService) { }

    ngOnInit() {
        console.log('Tasks ngOnInit');
        this.tasksService.getTasksOfDay();
        // melyik a jobb signature getTasksOfDay v getDailyStats
        /*this.tasksService.getDailyStats(
            this.dateService.selectedDay.year,
            this.dateService.selectedDay.month,
            this.dateService.selectedDay.day
        );
        */
    }

}
