import { Component, OnInit } from '@angular/core';
import { DateService } from '../../shared/services/date.service';

@Component({
    selector: 'my-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
    actualDay: Date;

    constructor(private dateService: DateService) { }

    ngOnInit() {
        this.dateService.currentDate.subscribe(actualDay => this.actualDay = actualDay);
    }

    setNextYear(): void {
        this.dateService.setActualDate(new Date(this.actualDay.getFullYear() + 1,
            this.actualDay.getMonth(), this.actualDay.getDate()));
    }

    setPreviousYear(): void {
        this.dateService.setActualDate(new Date(this.actualDay.getFullYear() - 1, this.actualDay.getMonth(), this.actualDay.getDate()));
    }

    setPreviousMonth(): void {
        let month = this.actualDay.getMonth();
        let year = this.actualDay.getFullYear();

        if (month === 0) {
            month = 11;
            year--;
        } else {
            month--;
        }
        this.dateService.setActualDate(new Date(year, month, this.actualDay.getDate()));
    }

    setNextMonth(): void {
        let month = this.actualDay.getMonth();
        let year = this.actualDay.getFullYear();

        if (month === 11) {
            month = 0;
            year++;
        } else {
            month++;
        }
        this.dateService.setActualDate(new Date(year, month, this.actualDay.getDate()));
        // document.getElement

    }

}
