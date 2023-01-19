export class Task {
    public taskId: string;
    public title: string;
    public status: TaskStatus;
    public plannedDateStart: Date;
    public plannedDateEnd: Date;
}

export class CreateTaskDto {
    public goalId: string;
    public title: string;
    public plannedDateStart: Date;
    public plannedDateEnd: Date;
}

export class UpdateTaskDto {
    public goalId: string;
    public title: string;
    public plannedDateStart: Date;
    public plannedDateEnd: Date;
}

export enum TaskStatus {
    Ready = 'Ready',
    InProgress = 'InProgress',
    Completed = 'Completed',
}
   