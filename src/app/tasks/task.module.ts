import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { TaskRoutingModule } from "./task-routing.module";
import { TaskStatusLabelComponent } from "./task-status/task-status.component";
import { TaskService } from "./task.service";

@NgModule({
    imports: [SharedModule],
    providers: [TaskService],
    declarations: [TaskRoutingModule.components],
    exports: [TaskRoutingModule.components],
  })
  
export class TaskModule {}
  