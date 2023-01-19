import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GoalStatus } from '../../goal.model';

@Component({
  selector: 'vita-goal-status',
  templateUrl: './goal-status.component.html',
  styleUrls: ['./goal-status.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalStatusComponent {
  @Input() goalStatus: GoalStatus;
  
  get statusText(): string {
    switch (this.goalStatus) {
      case GoalStatus.Completed:
        return 'Completed';
      case GoalStatus.ToBeDefined:
        return 'To be defined';
      case GoalStatus.Ready:
        return 'Ready';
      case GoalStatus.InProgress:
        return 'In progress'
      default:
        throw new Error('Not implemented status translation');
    }
  }
}
