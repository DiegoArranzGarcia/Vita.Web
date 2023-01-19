import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/tasks/task.model';
import { TaskService } from 'src/app/tasks/task.service';
import { GoalService } from '../../goal.service';

@Component({
    selector: 'vita-goal-tasks',
    templateUrl: './goal-tasks.component.html',
    styleUrls: ['./goal-tasks.component.sass']
})

export class GoalTasksComponent implements OnInit {

    @Input() goalId: string;

    _goalTasks: Task[];

    constructor(private goalService: GoalService, private taskService: TaskService) {
        
    }

    ngOnInit(): void {
        this.goalService.getGoalTasks(this.goalId)
                        .subscribe(tasks => this._goalTasks = tasks);
    }

    handleOnTaskChanged(event: { task : Task, index: number }) {
        const updateTaskDto = {
            title: event.task.title,
            plannedDateStart: event.task.plannedDateStart,
            plannedDateEnd: event.task.plannedDateEnd,
            goalId: this.goalId
        };

        this.taskService.updateTask(event.task.taskId, updateTaskDto)
                        .subscribe(_ =>  { 
                            let tasks = [...this._goalTasks];
                            tasks[event.index] = event.task;
                            this._goalTasks = tasks;
                        });
    }

    handleTaskCreated(task: Task) {
        const createTaskDto = {
            title: task.title,
            plannedDateStart: task.plannedDateStart,
            plannedDateEnd: task.plannedDateEnd,
            goalId: this.goalId
        };

        this.taskService.createTask(createTaskDto)
                        .subscribe(task => { this._goalTasks = [...this._goalTasks, task]; });
    }

    handleOnTaskDeleted(index: number) {

        this.taskService.deleteTask(this._goalTasks[index].taskId)
                        .subscribe(() => {
                            let tasksWithoutRemovedOne = [...this._goalTasks];
                            tasksWithoutRemovedOne.splice(index, 1);

                            this._goalTasks = tasksWithoutRemovedOne;
                        })
    }
}