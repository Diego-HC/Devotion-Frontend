import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import { ApiService } from "../../api.service";
import { Subscription} from "rxjs";
import {TaskPreviewComponent} from "../task-preview/task-preview.component";
import { StoreService} from "../../store.service";

@Component({
  selector: 'app-kanban',
  template: `
  <div class = "grid grid-cols-4">
    <app-kanban-card [tasks]="response?.tasks?.notStarted ?? []" taskState="notStarted"/>
    <app-kanban-card [tasks]="response?.tasks?.inProgress" taskState="inProgress"/>
    <app-kanban-card [tasks]="response?.tasks?.inReview" taskState="inReview"/>
    <app-kanban-card [tasks]="response?.tasks?.done" taskState="done"/>
  </div>
  `
})
export class KanbanComponent implements OnInit, OnDestroy {
  constructor(
    protected api: ApiService,
    protected store: StoreService
  ) {}

  @Input() projectOrTaskId: string = '';
  @ViewChild(TaskPreviewComponent) taskPreview!: TaskPreviewComponent;
  private updateSubscription: Subscription = new Subscription();

  response? : KanbanView;


  ngOnInit(): void {
    const endpoint = `projects/${this.projectOrTaskId}/?view=kanban&partial=true`
    this.api.get(endpoint).subscribe((response : KanbanView) => {
      this.response = response;
    });
    this.updateSubscription = this.store.needsUpdate$.subscribe(needsUpdate => {
      if (needsUpdate) {
        this.fetchApi();
      }
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  fetchApi() {
    const endpoint = `projects/${this.projectOrTaskId}/?view=kanban&partial=true`
    this.api.get(endpoint).subscribe((response : KanbanView) => {
      this.response = response;
    });
  }

  navigateToTask(taskId: string) {

  }
}
