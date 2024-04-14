import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projects-icon',
  templateUrl: './projects-icon.component.html'
})
export class ProjectsIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '38';
  @Input() height: string = '44';
}
