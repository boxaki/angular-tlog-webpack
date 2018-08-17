import { Component, OnInit } from '@angular/core';
import { DateService } from '../../shared/services/date.service';

@Component({
    selector: 'my-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
    // actualDay: Date;

    constructor(private dateService: DateService) { }

    ngOnInit() {
        // this.dateService.currentDate.subscribe(actualDay => this.actualDay = actualDay);
    }

    setNextYear(): void {
        this.dateService.setNextYear();
    }

    setPreviousYear(): void {
        this.dateService.setPreviousYear();
    }

    setPreviousMonth(): void {
        this.dateService.setPreviousMonth();
    }

    setNextMonth(): void {
        this.dateService.setNextMonth();
    }

}
