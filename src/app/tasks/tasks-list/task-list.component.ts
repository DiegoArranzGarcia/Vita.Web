import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task, TaskStatus } from '../task.model';
import { TaskListViewModel } from './task-list.model';

@Component({
    selector: 'vita-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.sass']
})

export class TaskListComponent implements OnInit, OnChanges {

    @Input() header: string = 'Tasks';
    @Input() readOnly: boolean = true;
    @Input() tasks: Task[]; 
    @Input() collapsible: boolean = false;

    @Output() taskCreated = new EventEmitter<Task>();
    @Output() taskChanged = new EventEmitter<{task : Task, index: number }>();
    @Output() taskDeleted = new EventEmitter<number>();

    _addIcon = faPlus;
    _taskBeingCreated: Task;
    _currentTasks: TaskListViewModel[];
    _collapsed = false;
    
    ngOnInit(): void {
        this._currentTasks = this.tasks.map(x => <TaskListViewModel>({...x, listItemState: 'Unchaged'}));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['tasks'].currentValue !== changes['tasks'].previousValue)
            this._currentTasks = this.tasks.map(x => <TaskListViewModel>({...x, listItemState: 'Unchaged'}));
    }

    handleTaskChange(task: Task, index: number) {
        this.taskChanged.emit({task: task, index: index});
    }

    handleDelete(index: number) {
        this.taskDeleted.emit(index);
    }

    handleTaskCreated(task: Task) {
        this._taskBeingCreated = undefined;
        this.taskCreated.emit(task);
    }

    handleOnTaskBeingCreated(){
        this._taskBeingCreated = <Task>({
            taskId: undefined,
            status: TaskStatus.Ready,
            title: "",
            plannedDateStart: undefined,
            plannedDateEnd: undefined
        });

        let taskBeingCreatedViewModel = <TaskListViewModel>({
            ...this._taskBeingCreated,
            listItemState: 'Created'
        });

        this._currentTasks = [taskBeingCreatedViewModel, ...this._currentTasks];        
    }

    cancelTaskBeingCreated() {
        this._taskBeingCreated = undefined;
    }

    triggerCollapsible() {
        if (!this.collapsible)
            return;

        this._collapsed = !this._collapsed;
    }
}