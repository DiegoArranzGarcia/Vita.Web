import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoalService } from '../goal.service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { CreateGoalDto, Goal } from '../goal.model';
import { UserService } from 'src/app/core/user/user.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'vita-create-goal-card',
  templateUrl: './create-goal-card.component.html',
  styleUrls: ['./create-goal-card.component.sass'],
})
export class CreateGoalCardComponent implements OnInit {
  addIcon = faCheckCircle;
  goalForm: UntypedFormGroup;

  @Output() created = new EventEmitter<Goal>();

  constructor(private _goalService: GoalService, private _userService: UserService) {}

  ngOnInit() {
    this.goalForm = new UntypedFormGroup({
      titleControl: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
      descriptionControl: new UntypedFormControl(''),
    });
  }

  onSubmit() {
    const createGoalDto: CreateGoalDto = {
      title: this.goalForm.value.titleControl,
      description: this.goalForm.value.descriptionControl,
      createdBy: this._userService.getCurrentUser().id,
    };

    this._goalService.createGoal(createGoalDto).subscribe(goal => {
      this.goalForm.reset();
      this.created.emit(goal);
    });
  }

  get title() {
    return this.goalForm.get('titleControl');
  }

  get description() {
    return this.goalForm.get('descriptionControl');
  }
}
