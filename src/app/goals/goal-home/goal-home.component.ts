import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Goal } from '../goal.model';
import { GoalService } from '../goal.service';

@Component({
  selector: 'vita-goal-home',
  templateUrl: './goal-home.component.html',
  styleUrls: ['./goal-home.component.sass'],
})
export class GoalHomeComponent implements OnInit {
  
  _goals: Goal[];
  
  private getGoalsSubscription: Subscription;

  constructor(private goalService: GoalService) {}

  ngOnInit() {
    this.loadGoals();
  }

  ngOnDestroy() {
    if (!!this.getGoalsSubscription && !this.getGoalsSubscription.closed) this.getGoalsSubscription.unsubscribe();
  }

  loadGoals() {
    this.getGoalsSubscription = this.goalService.getGoals(undefined, undefined, false).subscribe(goals => {
      this._goals = goals;
    });
  }

  get isLoading() {
    return this.getGoalsSubscription && !this.getGoalsSubscription.closed;
  }

}
