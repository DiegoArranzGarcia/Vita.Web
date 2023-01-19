import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TaskRoutingModule } from "./task-routing.module";
import { TaskService } from "./task.service";

@NgModule({
    imports: [ SharedModule, TaskRoutingModule, FormsModule, ReactiveFormsModule ],
    providers: [TaskService],
    declarations: [TaskRoutingModule.components],
    exports: [TaskRoutingModule.components],
  })
  
export class TaskModule {}
  