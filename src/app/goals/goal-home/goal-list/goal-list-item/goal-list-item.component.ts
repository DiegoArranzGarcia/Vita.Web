import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Goal } from "../../../goal.model";

@Component({
    selector: 'vita-goal-list-item',
    templateUrl: './goal-list-item.component.html',
    styleUrls: ['./goal-list-item.component.sass'],
  })
  
export class GoalListItemComponent {
  
  @Input() goal: Goal;
  @Input() deletable: boolean;

  @Output() deleted = new EventEmitter<Goal>();

  constructor() {}

  handleOnDeleted(goal: Goal) {
    this.deleted.emit(goal);
  }

}