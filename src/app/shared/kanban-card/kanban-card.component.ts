import { Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kanban-card',
  template: `
  <div class = "flex w-11/12"> 
    <div class = "flex flex-col mb-3 w-full">
      <div class = "flex align-middle place-items-center mb-3">
        <div class = "shadow-sm w-2 h-2 rounded-full border-gray-500 border-solid mr-1" 
        [class.bg-notStarted]="taskState === 'notStarted'"
        [class.bg-inProgress]="taskState === 'inProgress'"
        [class.bg-inReview]="taskState === 'inReview'"
        [class.bg-done]="taskState === 'done'"
        ></div>
        <h1 class = "mx-1 align-middle font-bold font-roboto">{{ getStateTitle(taskState) }}</h1>
        <div class = "flex place-items-center justify-center h-4 w-4 text-xs rounded-sm text-white font-medium ml-2"
        [class.bg-notStarted]="taskState === 'notStarted'"
        [class.bg-inProgress]="taskState === 'inProgress'"
        [class.bg-inReview]="taskState === 'inReview'"
        [class.bg-done]="taskState === 'done'"> {{ tasks?.length}} </div>
      </div>
      <ng-container *ngFor="let task of tasks">
      <div class = "flex bg-white shadow-md w-full border-gray-500 rounded-sm m-1  hover:bg-gray-50" (click)="navigateToTask(task.id)">
        <div class = "w-1 h-fullrounded-sm"
        [class.bg-notStarted]="taskState === 'notStarted'"
        [class.bg-inProgress]="taskState === 'inProgress'"
        [class.bg-inReview]="taskState === 'inReview'"
        [class.bg-done]="taskState === 'done'"></div>
          <div class = "flex flex-col">
            <h1 class = "font-bold font-robotoCondensed ml-2 mt-1"> {{task.name}} </h1>
            <h1 class = "ml-2 mb-1"> {{task.assignee.name}} </h1>
          </div>
      </div>
      </ng-container>
    </div>
  </div>
  `
})
export class KanbanCardComponent {
  @Input() taskState: string = '';
  @Input() tasks? : TaskKanban[] = [];

  constructor(private router: Router) { }

  navigateToTask(taskid: string){
    this.router.navigate(['/task', taskid]);
  }

  getStateTitle(state: string): string {
    switch (state) {
      case 'notStarted':
        return 'No Iniciado';
      case 'inProgress':
        return 'En Proceso';
      case 'inReview':
        return 'En Revisión';
      case 'done':
        return 'Completado';
      default: 
        return 'Unknown';
    }
  }

  getTaskColor(state: string):string{
    switch (state) {
      case 'notStarted':
        return 'bg-notStarted';
      case 'inProgress':
        return 'bg-inProgress';
      case 'inReview':
        return 'bg-inReview';
      case 'done':
        return 'bg-done';
      default: 
        return 'Unknown';
    }
  }
}
