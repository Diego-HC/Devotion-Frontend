import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from "../../api.service";

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
export class KanbanComponent implements OnInit{
  constructor(
    protected api: ApiService
  ) {}

  @Input() projectOrTaskId: string = '';
  response? : KanbanView;


  ngOnInit(): void {
    const endpoint = `projects/${this.projectOrTaskId}/?view=kanban&get=tasks`
    this.api.get(endpoint).subscribe((response : KanbanView) => {
      this.response = response;
    });
  }

  navigateToTask(taskId: string) {

  }
}
