import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import { ApiService } from "../../api.service";
import { Subscription} from "rxjs";
import {TaskPreviewComponent} from "../task-preview/task-preview.component";
import { StoreService} from "../../store.service";

@Component({
  selector: 'app-kanban',
  template: `
    <app-tasks-loading *ngIf="store.loadingSubtasks" />
    <div class = "grid grid-cols-4">
      <app-kanban-card [tasks]="response?.tasks?.notStarted" taskStatus="notStarted"/>
      <app-kanban-card [tasks]="response?.tasks?.inProgress" taskStatus="inProgress"/>
      <app-kanban-card [tasks]="response?.tasks?.inReview" taskStatus="inReview"/>
      <app-kanban-card [tasks]="response?.tasks?.done" taskStatus="done"/>
    </div>
  `
})
export class KanbanComponent implements OnInit, OnDestroy {
  constructor(
    protected api: ApiService,
    protected store: StoreService
  ) {}

  @ViewChild(TaskPreviewComponent) taskPreview!: TaskPreviewComponent;
  @Input() projectOrTaskId: string = '';
  @Input() isTask = false;

  response? : KanbanResponse;
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const _updateTasks = this.updateTasks.bind(this);
    this.subscriptions.add(this.store.showAssignedTasks$.subscribe(_updateTasks));
    this.subscriptions.add(this.store.showSubtreeTasks$.subscribe(_updateTasks));
    this.subscriptions.add(this.store.needsUpdate$.subscribe(_updateTasks));
    this.updateTasks();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateTasks() {
    this.store.loadingSubtasks = true;
    const endpoint = `${this.isTask ? "tasks" : "projects"}/${this.projectOrTaskId}/?get=tasks&view=kanban&assigned=${this.store.showAssignedTasks}&subtree=${this.store.showSubtreeTasks}`;
    this.api.get(endpoint).subscribe((response: KanbanResponse) => {
      this.response = response;
      this.store.loadingSubtasks = false;
    });
  }
}
