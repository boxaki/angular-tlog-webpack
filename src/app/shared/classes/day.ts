
export class Day {
    type: string; // (enum?)
    year: number;
    month: number;
    day: number;
    extraMinutes: number;

    constructor(private t: string, private actualYear: number, private actualMonth: number, private actualDay: number) {
        this.type = this.t;
        this.year = this.actualYear;
        this.month = this.actualMonth;
        this.day = this.actualDay;
    }

    setExtraMinutes(minutes: number) {
        this.extraMinutes = minutes;
    }
}
