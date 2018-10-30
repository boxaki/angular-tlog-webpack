import { DateService } from './date.service';

describe('DateService', () => {
  let service;

  beforeEach(() => {
    service = new DateService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the date to the first of this month', () => {
    service.currentDate.subscribe(date => {
      let expectedDate = new Date;
      expectedDate.setDate(1);
      expect(date.toDateString()).toBe(expectedDate.toDateString());
    });
  });

  it('should set the next month', () => {
    service.setNextMonth();
    service.currentDate.subscribe(date => {
      expect(date.getFullYear()).toBe(new Date().getFullYear());
      expect(date.getMonth()).toBe(new Date().getMonth() + 1);
      expect(date.getDate()).toBe(1);
    });
  });

  it('should set the previous month', () => {
    let today = new Date();
    let expectedDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    service.setPreviousMonth();
    service.currentDate.subscribe(date => {
      expect(date.toDateString()).toBe(expectedDate.toDateString());
    });
  });

  it('should set the next year', () => {
    let today = new Date();
    let expectedDate = new Date(today.getFullYear() + 1, today.getMonth(), 1);

    service.setNextYear();
    service.currentDate.subscribe(date => {
      expect(date.toDateString()).toBe(expectedDate.toDateString());
    });
  });

  it('should set the previous year', () => {
    let today = new Date();
    let expectedDate = new Date(today.getFullYear() - 1, today.getMonth(), 1);

    service.setPreviousYear();
    service.currentDate.subscribe(date => {
      expect(date.toDateString()).toBe(expectedDate.toDateString());
    });
  });

  it('should set the year correctly for setNextMonth() in December', () => {
    setDateInService(new Date(2020, 11, 1));
    service.setNextMonth();
    service.currentDate.subscribe(date => {
      expect(date.getFullYear()).toBe(2021);
      expect(date.getMonth()).toBe(0);
    });
  });

  it('should set the year correctly for setPreviousMonth() in January', () => {
    setDateInService(new Date(2020, 0, 1));
    service.setPreviousMonth();
    service.currentDate.subscribe(date => {
      expect(date.getFullYear()).toBe(2019);
      expect(date.getMonth()).toBe(11);
    });
  });

  it('should set the default selected day', () => {
    let today = new Date();
    expect(service.selectedDay.year).toBe(today.getFullYear());
  });

  function setDateInService(dateToSet: Date) {
    let expectedYear = dateToSet.getFullYear();
    let expectedMonth = dateToSet.getMonth();
    let actualYear;
    let actualMonth;

    service.currentDate.subscribe(date => {
      actualYear = date.getFullYear();
      actualMonth = date.getMonth();
    });
    let counter = expectedYear - actualYear;
    while (counter) {
      if (counter > 0) {
        service.setNextYear();
        --counter;
      } else if (counter < 0) {
        service.setPreviousYear();
        ++counter;
      }
    }

    counter = expectedMonth - actualMonth;
    while (counter) {
      if (counter > 0) {
        service.setNextMonth();
        --counter;
      } else if (counter < 0) {
        service.setPreviousMonth();
        ++counter;
      }
    }

  }
});
