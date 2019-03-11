import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { WorkMonth } from '../classes/workMonth';

@Injectable()
export class MonthlyStatsService {
    monthForStats$: Observable<WorkMonth>;

    constructor(private httpService: HttpService) { }

    public updateMonthlyStats(actualDay: Date): void {
        this.monthForStats$ = this.httpService.getMonthlyStats(actualDay.getFullYear(), actualDay.getMonth() + 1);
    }

}
