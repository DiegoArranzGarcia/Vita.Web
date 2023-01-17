import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCheckCircle, faCross, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/tasks/task.model';

@Component({
    selector: 'vita-goal-task',
    templateUrl: './goal-task.component.html',
    styleUrls : ['./goal-task.component.sass']
})

export class GoalTaskComponent implements OnInit {    
    
    @Input() task: Task;
    @Output() taskChange = new EventEmitter<Task>();
    @Output() delete = new EventEmitter<void>();
    
    submitIcon = faCheckCircle;
    deleteIcon = faXmark;
    taskForm: FormGroup;

    ngOnInit() {
        this.taskForm = new FormGroup({
            title: new FormControl(this.task.title, [Validators.required, Validators.minLength(1)]),
            plannedDate: new FormControl(({start: this.task.plannedDateStart, end: this.task.plannedDateEnd }))
        });
    }

    handleOnSubmit(){
        let task = <Task>({
            taskId: this.task.taskId,
            title: this.taskForm.get('title').value,            
            plannedDateStart: this.taskForm.get('plannedDate').value.start,
            plannedDateEnd: this.taskForm.get('plannedDate').value.end,
        })

        this.taskChange.emit(task);
        this.taskForm.markAsPristine();
    }

    handleOnDeleteClick() {
        this.delete.emit();
    }
}