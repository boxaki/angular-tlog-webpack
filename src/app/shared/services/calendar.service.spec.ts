import { async } from '@angular/core/testing';
import { defer } from 'rxjs/observable/defer';

import { CalendarService } from './calendar.service';

import { testDays, testMonths } from '../test/test-data';

export function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

// hogy lehet kulon file-ba rakni, anélkul, hogy azz app.modul-ba kéne rakni
export class MockDateService {
    private actualDate = new Date(2020, 10, 1);

    get currentDate() {
        return fakeAsyncResponse(this.actualDate);
    }

    setNextMonth() {
        this.actualDate = new Date(1880, 1, 1);
    }
};

export class MockHttpService {
    getMonthsData() {
        return fakeAsyncResponse(testDays);
    }

    getMonthlyStats() {
        return fakeAsyncResponse(testMonths);
    }
};

export class MockSelectedDayService { };

describe('CalendarService', () => {
    let calendarService: CalendarService;
    let dateService;
    let httpService;
    let selectedDayService;

    beforeEach(async(() => {
        dateService = new MockDateService();
        httpService = new MockHttpService();
        selectedDayService = new MockSelectedDayService();

        calendarService = new CalendarService(httpService, dateService, selectedDayService);
    }));

    it('should be created', () => {
        expect(calendarService).toBeTruthy();
    });

    it('should set fake services', () => {
        const function1spy = spyOn(httpService, 'getMonthsData');
        const function2spy = spyOn(httpService, 'getMonthlyStats');

        httpService.getMonthsData(2020, 11);
        httpService.getMonthlyStats(2020, 11);

        expect(httpService).toBeTruthy();
        expect(function1spy).toHaveBeenCalledWith(2020, 11);
        expect(function2spy).toHaveBeenCalledWith(2020, 11);
        dateService.currentDate.subscribe(
            date => expect(date.getMonth()).toBe(10, 'date service set properly'),
            fail
        );
    });

    it('constructor should set currentMonth', () => {
        let workdays = 0;

        calendarService.currentMonth.skip(1).subscribe(
            month => {
                expect(month.length).toBe(6);
                month.forEach(week => {
                    expect(week.days.length).toBe(7);
                    workdays += week.days.filter(day => day.type === 'workday').length;
                });
                expect(workdays).toBe(testDays.length);
            },
            fail
        );
    });

});
