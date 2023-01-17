import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/tasks/task.model';
import { TaskService } from 'src/app/tasks/task.service';
import { Goal } from '../../goal.model';
import { GoalTaskListItem } from './goal-tasks.model';

@Component({
    selector: 'vita-goal-tasks',
    templateUrl: './goal-tasks.component.html',
    styleUrls: ['./goal-tasks.component.sass']
})

export class GoalTasksComponent implements OnInit {

    @Input() goal: Goal;

    addIcon = faPlus;
    tasks: GoalTaskListItem[];

    constructor(private taskService: TaskService) {
        
    }

    ngOnInit() { 
        this.tasks = (this.goal.tasks || []).map(x => <GoalTaskListItem>({
             task: x,
             isCreating: false,
             editing: false
        }));
    }

    onClick() {
        var task: GoalTaskListItem = { task: ({taskId: "", title: "", plannedDateStart: undefined, plannedDateEnd: undefined }), isCreating: true };
        this.tasks = [...this.tasks, task];
    }

    handleTaskChange(task: Task, index: number) {
        var submittedTask: GoalTaskListItem = this.tasks[index];
        
        if (submittedTask.isCreating)
            this.createTask(task, index);
        else
            this.updateTask(task);
    }

    createTask(task: Task, index: number) {
        this.taskService.createTask({ 
            title: task.title, 
            plannedDateStart: task.plannedDateStart,
            plannedDateEnd: task.plannedDateEnd,
            goalId: this.goal.id 
        }).subscribe(task => {
            this.tasks[index] = <GoalTaskListItem>({
                task:task,
                isCreating: false,
            })
        });
    }

    updateTask(task: Task) {
        this.taskService.updateTask(task.taskId, { 
            title: task.title, 
            plannedDateStart: task.plannedDateStart,
            plannedDateEnd: task.plannedDateEnd,
            goalId: this.goal.id 
        }).subscribe();
    }

    handleDelete(index: number) {
        let taskToDelete = this.tasks[index];

        this.taskService.deleteTask(taskToDelete.task.taskId)
                        .subscribe(() => {
                            let tasksWithoutRemovedOne = [...this.tasks];
                            tasksWithoutRemovedOne.splice(index, 1);

                            this.tasks = tasksWithoutRemovedOne;
                        })
    }

    get isCreatingTask() : boolean {
        return this.tasks.some(x => x.isCreating === true);
    }
}