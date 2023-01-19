import { Injectable } from '@angular/core';
import { Goal, CreateGoalDto, UpdateGoalDto } from './goal.model';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigurationService } from '../core/configuration/configuration.service';
import { Task } from '../tasks/task.model';


@Injectable()
export class GoalService {
  private _goalsEndpoint: string;

  constructor(configurationService: ConfigurationService, private _httpClient: HttpClient) {
    this._goalsEndpoint = `${configurationService.getConfiguration().vitaApiEndpoint}/api/goals`;
  }

  public getGoal(id: string): Observable<Goal> {
    return this._httpClient.get<Goal>(this._goalsEndpoint + `/${id}`)
                           .pipe(map(goal => this.mapGoal(goal)));
  }
  
  public getGoalTasks(id: string) : Observable<Task[]> {
    return this._httpClient.get<Task[]>(this._goalsEndpoint + `/${id}/tasks`)
                           .pipe(map(tasks => this.mapGoalTasks(tasks)));
  }
  
  public getGoals(startDate?: Date, endDate?: Date, showCompleted?: boolean): Observable<Goal[]> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate.toISOString());
    if (endDate) params = params.set('endDate', endDate.toISOString());
    if (showCompleted) params = params.set('showCompleted', showCompleted.toString());

    return this._httpClient
      .get<Goal[]>(this._goalsEndpoint, { params: params })
      .pipe(map(goals => goals.map(goal => this.mapGoal(goal))));
  }


  public createGoal(createDto: CreateGoalDto): Observable<Goal> {
    return this._httpClient
      .post(this._goalsEndpoint, createDto, { observe: 'response' })
      .pipe(flatMap((response: any) => this._httpClient.get<Goal>(response.headers.get('location'))));
  }

  public deleteGoal(id: string): Observable<void> {
    return this._httpClient.delete<void>(this._goalsEndpoint + `/${id}`);
  }

  public updateGoal(id: string, updateDto: UpdateGoalDto): Observable<void> {
    return this._httpClient.patch<void>(this._goalsEndpoint + `/${id}`, updateDto);
  }

  public completeGoal(id: string): Observable<void> {
    return this._httpClient.put<void>(this._goalsEndpoint + `/${id}/complete`, null);
  }

  public readyGoal(id: string): Observable<void> {
    return this._httpClient.put<void>(this._goalsEndpoint + `/${id}/ready`, null);
  }

  public inProgressGoal(id: string): Observable<void> {
    return this._httpClient.put<void>(this._goalsEndpoint + `/${id}/in-progress`, null);
  }

  private mapGoal(goalDto: Goal): Goal {
    return {
      ...goalDto,
      aimDateStart: goalDto.aimDateStart ? new Date(goalDto.aimDateStart) : null,
      aimDateEnd: goalDto.aimDateEnd ? new Date(goalDto.aimDateEnd) : null,
      createdOn: goalDto.createdOn ? new Date(goalDto.createdOn) : null,
    };
  }

  private mapGoalTasks(tasks: Task[]): Task[] {
    return (tasks|| []).map(task => <Task>({ 
      ...task, 
      plannedDateStart: task.plannedDateStart ? new Date(task.plannedDateStart) : null, 
      plannedDateEnd: task.plannedDateEnd ? new Date(task.plannedDateEnd) : null
    }));
  }
}
