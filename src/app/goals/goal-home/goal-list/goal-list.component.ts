import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Goal } from '../../goal.model';

@Component({
  selector: 'vita-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.sass'],
})

export class GoalListComponent {

  addIcon = faPlus;

  @Input() goals: Goal[];

  constructor(private router: Router) {}

  onAddGoalClicked() {
    this.router.navigate(['/goals/new']);
  }

}
