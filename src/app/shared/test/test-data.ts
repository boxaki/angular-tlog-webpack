import { WorkDay } from '../classes/workDay';
import { WorkMonth } from '../classes/workMonth';
import { Day } from '../classes/day';
import { Week } from '../classes/week';
import { Task } from '../classes/task';
import { WorkDayRB } from '../classes/workDayRB';
import { StartTaskRB } from '../classes/startTaskRB';
import { FinishTaskRB } from '../classes/finishTaskRB';
import { ModifyTaskRB } from '../classes/modifyTaskRB';
import { DeleteTaskRB } from '../classes/deleteTaskRB';


export const testDay1: WorkDay = {
    tasks: [],
    requiredMinPerDay: 450,
    actualDay: '2020-11-11',
    sumPerDay: 450,
    extraMinPerDay: 0,
    endTimeOfLatestTask: null
};

export const testDay2: WorkDay = {
    tasks: [],
    requiredMinPerDay: 450,
    actualDay: '2020-11-12',
    sumPerDay: 480,
    extraMinPerDay: 30,
    endTimeOfLatestTask: null
};

export const testDays: WorkDay[] = [
    testDay1,
    testDay2
];

export const testMonth1: WorkMonth = {
    days: testDays,
    date: '2020-11',
    sumPerMonth: 930,
    requiredMinPerMonth: 900,
    extraMinPerMonth: 30
};

export const testMonths: WorkMonth[] = [testMonth1];


const day1: Day = new Day('other-month', 2030, 1, 30);
const day2: Day = new Day('simple-day', 2030, 2, 3);
const day3: Day = new Day('simple-day', 2030, 2, 4);
const day4: Day = new Day('workday', 2030, 2, 5);
const day5: Day = new Day('workday', 2030, 2, 6);
const day6: Day = new Day('workday', 2030, 2, 7);
const day7: Day = new Day('workday', 2030, 2, 8);

export const testWeek: Week = {
    days: [day1, day2, day3, day4, day5, day6, day7]
};

export const testTask1: Task = {
    taskId: '1234',
    startTime: '11:00',
    endTime: '12:00',
    comment: 'mamamama',
    minPerTask: 60
};

export const testTask2: Task = {
    taskId: '2345',
    startTime: '08:00',
    endTime: '09:00',
    comment: 'bababa',
    minPerTask: 60
};

export const testTasks: Task[] = [
    testTask1,
    testTask2
];

export const testWorkDayRB: WorkDayRB = {
    year: 2020,
    month: 12,
    day: 12,
    requiredMinPerDay: 420
};

export const testStartTaskRB: StartTaskRB = {
    year: 2020,
    month: 12,
    day: 14,
    taskId: '1234',
    comment: 'wawawa',
    startTime: '10:10'
};

export const testFinishTaskRB: FinishTaskRB = {
    year: 2020,
    month: 12,
    day: 14,
    taskId: '1234',
    startTime: '10:10',
    endTime: '11:00'
};

export const testModifyTaskRB: ModifyTaskRB = {
    year: 2020,
    month: 12,
    day: 14,
    taskId: '1234',
    startTime: '10:10',
    newTaskId: '2345',
    newStartTime: '09:00',
    newEndTime: '10:00',
    newComment: 'mamama'
};

export const testDeleteTaskRB: DeleteTaskRB = {
    year: 2020,
    month: 12,
    day: 14,
    taskId: '1234',
    startTime: '10:10',
};

