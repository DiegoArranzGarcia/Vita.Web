import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalHomeComponent } from './goal-home/goal-home.component';
import { GoalCardListComponent } from './goal-card-list/goal-card-list.component';
import { GoalCardComponent } from './goal-card/goal-card.component';
import { CreateGoalCardComponent } from './create-goal-card/create-goal-card.component';
import { GoalMenuComponent } from './goal-menu/goal-menu.component';
import { GoalStatusComponent } from './goal-status/goal-status.component';
import { GoalAimDateComponent } from './goal-aim-date/goal-aim-date.component';
import { GoalAimDatePipe } from './goal-aim-date/goal-aim-date-pipe/aim-date.pipe';
import { WeekGoalsHomeComponent } from './week-goals-home/week-goals-home.component';
import { GoalSummaryListComponent } from './goal-summary-list/goal-summary-list.component';
import { GoalSummaryListItemComponent } from './goal-summary-list/goal-summary-list-item/goal-summary-list-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: GoalHomeComponent,  },
  { path: 'week', component: WeekGoalsHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalRoutingModule {
  static components = [
    GoalHomeComponent,
    CreateGoalCardComponent,
    GoalCardListComponent,
    GoalCardComponent,
    GoalMenuComponent,
    GoalStatusComponent,
    GoalAimDateComponent,
    WeekGoalsHomeComponent,
    GoalAimDatePipe,
    GoalSummaryListComponent,
    GoalSummaryListItemComponent,
  ];
}
