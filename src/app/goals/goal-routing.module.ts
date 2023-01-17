import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalHomeComponent } from './goal-home/goal-home.component';
import { GoalCardListComponent } from './week-goals-home/goal-card-list/goal-card-list.component';
import { GoalCardComponent } from './week-goals-home/goal-card-list/goal-card/goal-card.component';
import { GoalMenuComponent } from './shared/goal-menu/goal-menu.component';
import { GoalStatusComponent } from './shared/goal-status/goal-status.component';
import { WeekGoalsHomeComponent } from './week-goals-home/week-goals-home.component';
import { GoalListComponent } from './goal-home/goal-list/goal-list.component';
import { GoalListItemComponent } from './goal-home/goal-list/goal-list-item/goal-list-item.component';
import { GoalDetailHomeComponent } from './goal-detail-home/goal-detail-home.component';
import { GoalTasksComponent } from './goal-detail-home/goal-tasks/goal-tasks.component';
import { GoalTaskComponent } from './goal-detail-home/goal-tasks/goal-task/goal-task.component';
import { GoalDetailCardComponent } from './shared/goal-detail-card/goal-detail-card.component';
import { CreateGoalHomeComponent } from './create-goal-home/create-goal-home.component';

const routes: Routes = [
  { path: '', component: GoalHomeComponent,  },
  { path: 'new', component: CreateGoalHomeComponent },
  { path: ':id', component: GoalDetailHomeComponent },
  { path: 'week', component: WeekGoalsHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class GoalRoutingModule {
  static components = [
    GoalHomeComponent,
    CreateGoalHomeComponent,
    GoalCardListComponent,
    GoalCardComponent,
    GoalMenuComponent,
    GoalStatusComponent,
    WeekGoalsHomeComponent,
    GoalListComponent,
    GoalListItemComponent,
    GoalDetailHomeComponent,
    GoalTasksComponent,
    GoalDetailCardComponent,
    GoalTaskComponent,
  ];
}
