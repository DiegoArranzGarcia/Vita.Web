import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskStatusLabelComponent } from './task-status/task-status.component';


const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TaskRoutingModule {
  static components = [
    TaskStatusLabelComponent
  ];
}
