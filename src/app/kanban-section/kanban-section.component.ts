import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-kanban-section',
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
        <div class= "min-h-5" cdkDropList [cdkDropListData]="tasks" (cdkDropListDropped)="drop($event)">
          <div *ngFor="let task of tasks">
            <app-kanban-card id= "task.name" [task]="task" [color] = "color" cdkDrag [cdkDragData]="task"></app-kanban-card>
          </div>
        </div>
    </div>
  </div>
  `
})
export class KanbanSectionComponent implements OnInit {
  constructor(private api: ApiService) { }

  @Input() taskStatus: string = '';
  @Input() tasks? : KanbanTask[] = [];

  selectedTaskId: string | null = null;
  color: string = '';
  stateNumber : number = 0;

  ngOnInit() {
    this.color = this.getTaskColor(this.taskStatus);
  }

  showTaskPreview(taskId: string) {
    this.selectedTaskId = taskId;
  }

  closeTaskPreview() {
    this.selectedTaskId = null;
  }

  drop(event: CdkDragDrop<KanbanTask[] | undefined>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data!, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data!,
                        event.container.data!,
                        event.previousIndex,
                        event.currentIndex);
      const task = event.item.data; // Assuming the dragged item's data is the task
      this.updateStatus(task, this.taskStatus); // Update the task's status
    }
  }
  
  updateStatus(task: Task, status: string) {
    this.stateNumber = this.statusNumber(status);
    this.api
      .put(`tasks/${task.id}/status/`, {status: this.stateNumber})
      .subscribe(() => {
        (error: any) => {
          console.error('Failed to update task status', error);
        }
      });
  }

  statusNumber(status: string) {
    switch (status) {
      case 'notStarted':
        return 0;
      case 'inProgress':
        return 1;
      case 'inReview':
        return 2;
      case 'done':
        return 3;
      default: 
        return 0;
    }
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
