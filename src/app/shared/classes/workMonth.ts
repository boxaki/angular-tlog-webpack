import { WorkDay } from './workDay';

export interface WorkMonth {
    days: WorkDay[];
    date: string; // atnevezni dateString-re
    sumPerMonth: number;
    requiredMinPerMonth: number;
    extraMinPerMonth: number;
}
