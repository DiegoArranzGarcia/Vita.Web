import { NgModule } from '@angular/core';
import { GoalRoutingModule } from './goal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GoalService } from './goal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskModule } from '../tasks/task.module';

@NgModule({
  imports: [SharedModule, GoalRoutingModule, FormsModule, ReactiveFormsModule, TaskModule],
  providers: [GoalService],
  declarations: [GoalRoutingModule.components],
  exports: [GoalRoutingModule.components]
})
export class GoalModule {}
