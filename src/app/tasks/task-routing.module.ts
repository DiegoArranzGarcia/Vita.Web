import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskStatusLabelComponent } from './task-status/task-status.component';
import { TaskListItemComponent } from './tasks-list/task-list-item/task-list-item.component';
import { TaskListComponent } from './tasks-list/task-list.component';
import { WeeklyTasksHomeComponent } from './weekly-tasks-home/weekly-tasks-home.component';


const routes: Routes = [
  { path: 'weekly', component: WeeklyTasksHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TaskRoutingModule {
  static components = [
    WeeklyTasksHomeComponent,
    TaskStatusLabelComponent,
    TaskListComponent,
    TaskListItemComponent
  ];
}
