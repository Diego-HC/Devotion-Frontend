import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService} from "../../store.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-preview',
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-1/2">
        <div class="flex justify-end items-center gap-4 mx-6 mt-4">
          <button (click)="navigateToTask()" [disabled]="isUpdating" class="text-xl">
            <app-fullscreen-icon width="18" height="18"></app-fullscreen-icon>
          </button>
          <button (click)="close()" [disabled]="isUpdating">
            <app-x-icon fill="#2A4365" width="20" height="20"></app-x-icon>
          </button>
        </div>
        <div class="w-full">
          <app-task-preview-info [taskId]="taskID" (taskUpdated)="onTaskUpdated()"></app-task-preview-info>
        </div>
      </div>
    </div>
  `
})
export class TaskPreviewComponent implements OnDestroy {
  @Input() taskID!: string;
  @Output() closePreview = new EventEmitter<void>();
  isUpdating = false;
  private needsUpdateSubscription: Subscription = new Subscription();

  constructor(private router: Router, private store: StoreService) {
    this.needsUpdateSubscription = this.store.needsUpdate$.subscribe(() => {
      this.isUpdating = false;
    });
  }

  ngOnDestroy() {
    if (this.needsUpdateSubscription) {
      this.needsUpdateSubscription.unsubscribe();
    }
  }

  close() {
    if (!this.isUpdating) {
      this.closePreview.emit();
    }
  }

  navigateToTask() {
    this.router.navigate(['/task', this.taskID]);
  }

  onTaskUpdated() {
    this.isUpdating = true;
    this.store.triggerUpdate()
  }
}
