import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-icon',
  templateUrl: './dashboard-icon.component.html',
})
export class DashboardIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '50';
  @Input() height: string = '35';
}
