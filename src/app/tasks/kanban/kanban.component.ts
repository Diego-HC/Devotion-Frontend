import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-kanban',
  template: `
  <div class = "grid grid-cols-4">
    <app-kanban-card />
    <app-kanban-card />
    <app-kanban-card />
    <app-kanban-card />
  </div>
  `
})
export class KanbanComponent implements OnInit{
  constructor(
    protected api: ApiService
  ) {}

  @Input() projectOrTaskId: string = '';

  ngOnInit(): void {
    // endpoint: /projects/<id>/?view=kanban&partial=true
    const endpoint = `/projects/${this.projectOrTaskId}/?view=kanban&partial=true`
    
    this.api.get(endpoint).subscribe
  }
}
