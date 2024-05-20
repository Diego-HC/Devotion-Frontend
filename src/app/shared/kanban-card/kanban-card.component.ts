import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kanban-card',
  template: `
    <div class="flex w-11/12">
      <div class="flex flex-col mb-3 w-full">
        <div class="flex align-middle place-items-center mb-3">
          <div class="shadow-sm w-2 h-2 rounded-full border-gray-500 border-solid mr-1"
               [ngClass]="color"
          ></div>
          <h1 class="mx-1 align-middle font-bold font-roboto">{{ getStateTitle(taskStatus) }}</h1>
          <div class="flex place-items-center justify-center h-4 w-4 text-xs rounded-sm text-white font-medium ml-2"
               [ngClass]="color"
          >
            {{ tasks?.length }}
          </div>
        </div>
        <ng-container *ngFor="let task of tasks">
          <div class="flex bg-white shadow-md w-full border-gray-500 rounded-sm m-1  hover:bg-gray-50"
               (click)="showTaskPreview(task.id)">
            <div class="w-1 h-fullrounded-sm" [ngClass]="color"></div>
            <div class="flex flex-col">
              <h1 class="font-bold font-robotoCondensed ml-2 mt-1"> {{ task.name }} </h1>
              <h1 class="ml-2 mb-1"> {{ task.assignee.name }} </h1>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
    <app-task-preview *ngIf="selectedTaskId" [taskID]="selectedTaskId"
                      (closePreview)="closeTaskPreview()"></app-task-preview>
  `
})
export class KanbanCardComponent implements OnInit {
  constructor(private router: Router) { }

  @Input() taskStatus: string = '';
  @Input() tasks? : TaskKanban[] = [];

  selectedTaskId: string | null = null;
  color: string = '';

  ngOnInit() {
    this.color = this.getTaskColor(this.taskStatus);
  }

  showTaskPreview(taskId: string) {
    this.selectedTaskId = taskId;
  }

  closeTaskPreview() {
    this.selectedTaskId = null;
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

  getTaskColor(state: string): string {
    switch (state) {
      case 'done':
        return 'bg-done';
      case 'inProgress':
        return 'bg-inProgress';
      case 'inReview':
        return 'bg-inReview';
      default:
        return 'bg-notStarted';
    }
  }
}
