import { CdkDrag } from '@angular/cdk/drag-drop';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-kanban-card',
  template: `
          <div class="flex bg-white shadow-md w-full border-gray-500 rounded-sm m-1  hover:bg-gray-50"
               (click)="showTaskPreview(task.id)" CdkDrag>
            <div class="w-1 h-fullrounded-sm" [ngClass]="color"></div>
            <div class="flex flex-col">
              <h1 class="font-bold font-robotoCondensed ml-2 mt-1"> {{ task.name }} </h1>
              <h1 class="ml-2 mb-1"> {{ task.assignee.name }} </h1>
            </div>
          </div>
    <app-task-preview *ngIf="selectedTaskId" [taskID]="selectedTaskId"
                      (closePreview)="closeTaskPreview()"></app-task-preview>
  `
})
export class KanbanCardComponent {
  constructor() { }

  @Input() taskStatus: string = '';
  @Input() task : KanbanTask = {id: '', name: '', description: '', priority: 1, assignee: {id: '', name: ''}};
  @Input() color: string = '';
  selectedTaskId: string | null = null;

  showTaskPreview(taskId: string) {
    this.selectedTaskId = taskId;
  }

  closeTaskPreview() {
    this.selectedTaskId = null;
  }
}
