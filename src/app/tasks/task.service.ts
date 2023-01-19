import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { ConfigurationService } from "../core/configuration/configuration.service";
import { CreateTaskDto, Task } from "./task.model";

@Injectable()
export class TaskService {

    private _tasksEndpoint: string;
  
    constructor(configurationService: ConfigurationService, private _httpClient: HttpClient) {
      this._tasksEndpoint = `${configurationService.getConfiguration().vitaApiEndpoint}/api/tasks`;
    }

    public getTasks(startDate?: Date, endDate?: Date, showCompleted?: boolean): Observable<Task[]> {
      let params = new HttpParams();
  
      if (startDate) params = params.set('startDate', startDate.toISOString());
      if (endDate) params = params.set('endDate', endDate.toISOString());
      if (showCompleted) params = params.set('showCompleted', showCompleted.toString());
  
      return this._httpClient
        .get<Task[]>(this._tasksEndpoint, { params: params })
        .pipe(map(tasks => tasks.map(task => this.mapTask(task))));
    }

    public createTask(createTaskDto: CreateTaskDto): Observable<Task> {
        return this._httpClient
          .post(this._tasksEndpoint, createTaskDto, { observe: 'response' })
          .pipe(flatMap((response: any) => this._httpClient.get<Task>(response.headers.get('location'))));
    }

    public updateTask(id:string, updateTaskDto: CreateTaskDto): Observable<void> {
      return this._httpClient.patch<void>(this._tasksEndpoint + `/${id}`, updateTaskDto);        
    }

    public deleteTask(id: string){
      return this._httpClient.delete(this._tasksEndpoint + `/${id}`);
    }

    private mapTask(task: Task): Task {
      return ({
        ...task,
        plannedDateEnd: task.plannedDateEnd ? new Date(task.plannedDateEnd) : null,
        plannedDateStart: task.plannedDateStart ? new Date(task.plannedDateStart) : null
      })
    }
}