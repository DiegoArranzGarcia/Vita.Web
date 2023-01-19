import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Week } from 'src/app/shared/week-picker/week-picker.component';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'vita-weekly-tasks-home',
  templateUrl: './weekly-tasks-home.component.html',
  styleUrls: ['./weekly-tasks-home.component.sass'],
})
export class WeeklyTasksHomeComponent implements OnInit {
  
  readonly _daysInAWeek: number = 7;
  
  _weekdays : string[];
  _week: Week;  
  _tasks : Task[];

  get _weeklyTasks() : Task[] {
    return this._tasks.filter(task => !this.isSingleDayTask(task));
  }

  get _dailyTasksPerWeekday() : { [key: number]: Task[] } {
    let tasksPerWeekDay : { [key: number]: Task[] } = {};
    this._weekdays.forEach((_, index) => tasksPerWeekDay[index] = []);

    this._tasks.filter(task => this.isSingleDayTask(task))
               .forEach(task => {      
                  let weekday : number = moment(task.plannedDateStart).weekday();
                  tasksPerWeekDay[weekday].push(task);
                });

    return tasksPerWeekDay;
  }

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    let referenceDate = new Date();
    this._week = this.getWeekByDate(referenceDate);
    this._weekdays = this.getWeekdaysDisplayFromWeek(this._week);
    this.loadWeekTasks();
  }

  handleOnWeekChange(week: Week) {
    this._week = week;
    this._weekdays = this.getWeekdaysDisplayFromWeek(week);
    this.loadWeekTasks();
  }

  private getWeekdaysDisplayFromWeek(week: Week) : string[] {
    let daysOfWeek = moment.weekdays();

    return daysOfWeek.map((dayOfWeek, index) => {
      var date = moment(week.startDate).add(index, 'days');
      return `${dayOfWeek} ${date.format('Do')}`;
    });
  }

  private loadWeekTasks() {
    this.taskService.getTasks(this._week.startDate, this._week.endDate, true)
                    .subscribe(tasks => this._tasks = tasks);
  }

  private isSingleDayTask(task: Task) : boolean {
    let startDate = moment(task.plannedDateStart);
    let endDate = moment(task.plannedDateEnd);

    let daysDiff: number = endDate.diff(startDate, 'days');
    
    return daysDiff == 0;
  }

  private getWeekByDate(referenceDate: Date): Week {
    var startWeekDate: Date = new Date(referenceDate);
    var endWeekDate: Date = new Date(referenceDate);

    startWeekDate.setDate(referenceDate.getDate() - referenceDate.getDay());
    endWeekDate.setDate(referenceDate.getDate() + (6 - referenceDate.getDay()));

    return {
      startDate: startWeekDate,
      endDate: endWeekDate,
    };
  }
}
