import { Component, OnInit } from '@angular/core';
import { DateService } from '../../shared/services/date.service';

@Component({
    selector: 'my-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

    constructor(private dateService: DateService) { }

    ngOnInit() {
    }

    /**
     * Sets the pager and dateService to the following year
     */
    public setNextYear(): void {
        this.dateService.setNextYear();
    }
    /**
     * Sets the pager and dateService to the previous year
     */

    public setPreviousYear(): void {
        this.dateService.setPreviousYear();
    }

    /**
      * Sets the pager and dateService to the previous month
      */
    public setPreviousMonth(): void {
        this.dateService.setPreviousMonth();
    }

    /**
      * Sets the pager and dateService to the next month
      */
    public setNextMonth(): void {
        this.dateService.setNextMonth();
    }

}
