import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MenuOption } from 'src/app/shared/menu/menu-option.model';
import { GoalService } from '../../goal.service';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Goal, GoalStatus } from '../../goal.model';

@Component({
  selector: 'vita-goal-menu',
  templateUrl: './goal-menu.component.html',
  styleUrls: ['./goal-menu.component.sass'],
})
export class GoalMenuComponent implements OnInit {
  @Input() goal: Goal;

  @Output() deleted = new EventEmitter<Goal>();
  @Output() statusChange = new EventEmitter<GoalStatus>();

  @ViewChild('modal') modal: ModalComponent;

  optionsIcon = faEllipsisV;
  options: MenuOption[];

  constructor(private goalService: GoalService) {}

  ngOnInit() {
    this.options = [
      {
        label: 'Set Ready',
        action: () => this.goalService.readyGoal(this.goal.id).subscribe(_ => this.statusChange.emit(GoalStatus.Ready)),
        show: () => this.goal.status === GoalStatus.ToBeDefined,
      },
      {
        label: 'Set In Progress',
        action: () => this.goalService.inProgressGoal(this.goal.id).subscribe(_ => this.statusChange.emit(GoalStatus.InProgress)),
        show: () => this.goal.status === GoalStatus.Ready,
      },
      {
        label: 'Complete Goal',
        action: () => this.goalService.completeGoal(this.goal.id).subscribe(_ => this.statusChange.emit(GoalStatus.Completed)),
        show: () => this.goal.status === GoalStatus.InProgress,
      },
      {
        label: 'Delete Goal',
        class: 'remove-option',
        action: () => this.goalService.deleteGoal(this.goal.id).subscribe(_ => this.deleted.emit(this.goal)),
      },
    ];
  }

  onOptionsClicked(event: Event) {
    this.modal.toogle();
    event.preventDefault();
  }
}
