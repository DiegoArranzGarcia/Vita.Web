import { Task } from "../task.model";

export class TaskListViewModel extends Task {
    public listItemState : 'Created' | 'Unchaged';
}