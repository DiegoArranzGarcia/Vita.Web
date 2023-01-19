import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Goal, GoalStatus } from '../../goal.model';

@Component({
    selector: 'vita-goal-detail-card',
    templateUrl: './goal-detail-card.component.html',
    styleUrls: ['./goal-detail-card.component.sass']
})

export class GoalDetailCardComponent implements OnInit {
    
    @Input() goal: Goal;
    @Input() readOnly: boolean = true;
    
    @Output() goalChange = new EventEmitter<Goal>();

    goalForm: FormGroup;
    submitIcon = faCheckCircle;
    
    constructor(private router: Router) { }

    ngOnInit() {
        this.goalForm = new FormGroup({
            title: new FormControl(this.goal.title, [Validators.required, Validators.minLength(1)]),
            description: new FormControl(this.goal.description),
            aimDate: new FormControl(({start: this.goal.aimDateStart, end: this.goal.aimDateEnd }))
        });
    }

    handleOnDelete() {
        this.router.navigate(["/goals"]);
    }

    handleOnStatusChange(status: GoalStatus) {
        let goal = <Goal>{...this.goal, status: status };
        this.goalChange.emit(goal);
    }
    
    handleOnSubmit(){
        let goal = <Goal>({
            id: this.goal.id,
            title: this.goalForm.get('title').value,
            description: this.goalForm.get('description').value,
            createdOn: this.goal.createdOn,

            aimDateStart: this.goalForm.get('aimDate').value.start,
            aimDateEnd: this.goalForm.get('aimDate').value.end,
            status: this.goal.status,
        })

        this.goalChange.emit(goal);
        this.goalForm.markAsPristine();
    }
}