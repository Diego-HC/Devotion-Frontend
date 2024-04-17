import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-icon',
  templateUrl: './kanban-icon.component.html'
})
export class KanbanIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '29';
  @Input() height: string = '25';
}
