import { WorkDay } from './workDay';

export class WorkMonth {
    days: WorkDay[];
    date: string;
    sumPerMonth: number;
    requiredMinPerMonth: number;
    extraMinPerMonth: number;
}