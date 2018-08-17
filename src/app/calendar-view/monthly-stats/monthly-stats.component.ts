import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../shared/services/calendar.service';

@Component({
  selector: 'my-monthly-stats',
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.scss']
})
export class MonthlyStatsComponent implements OnInit {

  constructor(public calendarService: CalendarService) { }

  ngOnInit() {
  }

}
