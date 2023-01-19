import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheckCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../task.model';

@Component({
    selector: 'vita-task-list-item',
    templateUrl: './task-list-item.component.html',
    styleUrls: ['./task-list-item.component.sass']
})

export class TaskListItemComponent implements OnInit {
    
    @Input() task: Task;
    @Input() readOnly: boolean = true;

    @Output() submitTask = new EventEmitter<Task>();
    @Output() deleteTask = new EventEmitter<void>();
    
    _taskForm: FormGroup;
    _submitIcon = faCheckCircle;
    _deleteIcon = faXmark;

    ngOnInit() {
        this._taskForm = new FormGroup({
            title: new FormControl(this.task.title, [Validators.required, Validators.minLength(1)]),
            plannedDate: new FormControl(({start: this.task.plannedDateStart, end: this.task.plannedDateEnd }))
        });
    }

    handleOnSubmit(){
        let task = <Task>({
            taskId: this.task.taskId,
            title: this._taskForm.get('title').value,            
            plannedDateStart: this._taskForm.get('plannedDate').value.start,
            plannedDateEnd: this._taskForm.get('plannedDate').value.end,
        })

        this.submitTask.emit(task);
        this._taskForm.markAsPristine();
    }

    handleOnDeleteClick() {
        this.deleteTask.emit();
    }
}