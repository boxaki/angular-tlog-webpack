import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CalendarService } from '../../shared/services/calendar.service';

@Component({
  selector: 'my-activate-day',
  templateUrl: './activate-day.component.html',
  styleUrls: ['./activate-day.component.scss']
})
export class ActivateDayComponent implements OnInit {
  private requiredTime: number;
  private unit = 'min';

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
  }

  /**
   * Sets the right amount of required time and saves it into calendarService
   *
   * @param form The html form from template
   */

  public activateDay(form: NgForm) {
    this.unit = form.controls['unit'].value;

    if (this.isEmptyInput()) {
      this.setDefaultValue();

    } else if (this.unit === 'hr') {
      this.requiredTime *= 60;
    }

    this.calendarService.activateDay(this.requiredTime);
  }

  private isEmptyInput(): boolean {
    return !this.requiredTime || (this.requiredTime.toString().trim().length === 0);
  }

  private setDefaultValue(): void {
    this.requiredTime = 450;
  }

}
