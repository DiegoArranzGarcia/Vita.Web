import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TaskStatus } from '../task.model';

@Component({
  selector: 'vita-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatusLabelComponent {
  @Input() taskStatus: TaskStatus;

  get statusText(): string {
    switch (this.taskStatus) {
      case TaskStatus.Completed:
        return 'Completed';
      case TaskStatus.Ready:
        return 'Ready';
      case TaskStatus.InProgress:
        return 'In progress'
      default:
        throw new Error('Not implemented status translation');
    }
  }
}
