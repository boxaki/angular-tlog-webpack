import { Task } from './task';

export class WorkDay {
    tasks: Task[];
    requiredMinPerDay: number;
    actualDay: string;
    sumPerDay: number;
    extraMinPerDay: number;
    endTimeOfLatestTask: string;
}
