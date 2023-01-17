import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";
import { ConfigurationService } from "../core/configuration/configuration.service";
import { CreateTaskDto, Task } from "./task.model";

@Injectable()
export class TaskService {
    private _tasksEndpoint: string;
  
    constructor(configurationService: ConfigurationService, private _httpClient: HttpClient) {
      this._tasksEndpoint = `${configurationService.getConfiguration().vitaApiEndpoint}/api/tasks`;
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
}