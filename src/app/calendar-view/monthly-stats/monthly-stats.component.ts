import { Component, OnInit } from '@angular/core';
import { MonthlyStatsService } from '../../shared/services/monthlyStats.service';

@Component({
  selector: 'my-monthly-stats',
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.scss']
})
export class MonthlyStatsComponent implements OnInit {

  constructor(public monthlyStatsService: MonthlyStatsService) { }

  ngOnInit() {
  }

}
