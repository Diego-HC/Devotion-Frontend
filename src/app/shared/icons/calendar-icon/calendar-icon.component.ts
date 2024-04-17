import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-icon',
  templateUrl: './calendar-icon.component.html'
})
export class CalendarIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '25';
  @Input() height: string = '30';
}
