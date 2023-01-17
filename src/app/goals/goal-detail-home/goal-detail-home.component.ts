import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
    selector: 'vita-goal-detail-home',
    templateUrl: 'goal-detail-home.component.html',
    styleUrls: ['goal-detail-home.component.sass']    
})

export class GoalDetailHomeComponent implements OnInit {

    id: string;    
    goal: Goal;

    constructor(private route: ActivatedRoute, private goalService: GoalService) { }

    ngOnInit() {
        this.route.params.subscribe(routeParams => {
            this.id = routeParams['id'];        
            this.loadGoalById(this.id);
        });
    }    

    private loadGoalById(id: string) {
        this.goalService.getGoal(id).subscribe(goal => { this.goal = goal; });
    }

    handleOnGoalChange(goal: Goal){
        if  (this.goal.status === goal.status)
            this.updateGoal(goal);
        else 
            this.goal = goal;
    }

    private updateGoal(goal: Goal) {
        this.goalService.updateGoal(this.id, {
            title: goal.title,
            description: goal.description,
            aimDateStart: goal.aimDateStart,
            aimDateEnd: goal.aimDateEnd
        }).subscribe(_ => this.loadGoalById(this.goal.id));
    }
}