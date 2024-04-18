import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-icon',
  templateUrl: './table-icon.component.html'
})
export class TableIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '29';
  @Input() height: string = '23';
}
