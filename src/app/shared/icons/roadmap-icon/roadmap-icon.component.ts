import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-roadmap-icon',
  templateUrl: './roadmap-icon.component.html'
})
export class RoadmapIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '31';
  @Input() height: string = '26';
}
