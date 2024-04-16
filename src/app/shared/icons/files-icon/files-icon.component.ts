import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-files-icon',
  templateUrl: './files-icon.component.html'
})
export class FilesIconComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '43';
  @Input() height: string = '44';
}
