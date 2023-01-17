import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { Goal, GoalStatus } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
    selector: 'vita-create-goal-home',
    templateUrl: './create-goal-home.component.html',
    styleUrls: ['./create-goal-home.component.sass']
})

export class CreateGoalHomeComponent implements OnInit {
    
    _goal: Goal;

    constructor(private router: Router, private goalService: GoalService, private userService: UserService){

    }

    ngOnInit() { 
        this._goal = ({
            id: undefined,
            title: "",
            description: "",
            status: GoalStatus.ToBeDefined,
            aimDateStart: undefined,
            aimDateEnd: undefined,
            tasks: [],
            createdOn: new Date()
        })
    }

    onSubmit(goal: Goal){
        this.goalService.createGoal({
            title: goal.title,
            description: goal.description,
            createdBy: this.userService.getCurrentUser().id,
        }).subscribe(goal => this.router.navigate(['goals', goal.id]))
    }
}