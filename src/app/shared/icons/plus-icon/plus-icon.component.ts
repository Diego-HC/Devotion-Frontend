import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plus-icon',
  templateUrl: './plus-icon.component.html'
})
export class PlusIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '30';
  @Input() height: string = '30';
}
