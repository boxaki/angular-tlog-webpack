import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CalendarService } from '../../shared/services/calendar.service';

@Component({
  selector: 'my-activate-day',
  templateUrl: './activate-day.component.html',
  styleUrls: ['./activate-day.component.scss']
})
export class ActivateDayComponent implements OnInit {
  requiredTime: number;
  unit = 'min';

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
  }

  activateDay(form: NgForm) {
    this.unit = form.controls['unit'].value;

    if (!this.requiredTime || (this.requiredTime.toString().trim().length === 0)) {
      if (this.unit === 'min') {
        this.requiredTime = 450;
      } else if (this.unit === 'hr') {
        this.requiredTime = 7.5;
      }
    }

    if (this.unit === 'hr') {
      this.requiredTime *= 60;
    }

    this.calendarService.activateDay(this.requiredTime);
  }

}
