import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-task',
  template: `
    <div class="w-[calc(100% - 32px)] h-5 mx-2 my-1 flex flex-row" *ngIf="task !== undefined">
      <span class="w-1.5 rounded-l-sm" [ngClass]="taskColor"></span>
      <a class="w-full h-full" (click)="showTaskPreview(task.id)">
        <div
          [ngClass]="taskLightColor"
          class="h-full rounded-l-none rounded-sm px-2"
        >
          <div class="h-full flex flex-col justify-around">
            <p class="line-clamp-1 text-xs">
              {{ task.name }}
            </p>
          </div>
        </div>
      </a>
      <app-task-preview *ngIf="selectedTaskId" [taskID]="task.id" (closePreview)="closeTaskPreview()"></app-task-preview>
    </div>
  `
})
export class CalendarTaskComponent {
  @Input() task?: CalendarTask;
  selectedTaskId: string | null = null;

  showTaskPreview(taskId: string) {
    this.selectedTaskId = taskId;
  }

  closeTaskPreview() {
    this.selectedTaskId = null;
  }

  get taskColor(): string {
    switch (this.task?.status) {
      case 3:
        return "bg-done";
      case 2:
        return "bg-inReview";
      case 1:
        return "bg-inProgress";
      case 0:
        return "bg-notStarted";
      default:
        return "";
    }
  }

  get taskLightColor(): string {
    switch (this.task?.status) {
      case 3:
        return "bg-doneLight";
      case 2:
        return "bg-inReviewLight";
      case 1:
        return "bg-inProgressLight";
      case 0:
        return "bg-notStartedLight";
      default:
        return "";
    }
  }
}
