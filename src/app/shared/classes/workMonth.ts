import { WorkDay } from './workDay';

export interface WorkMonth {
    days: WorkDay[];
    date: string;
    sumPerMonth: number;
    requiredMinPerMonth: number;
    extraMinPerMonth: number;
}