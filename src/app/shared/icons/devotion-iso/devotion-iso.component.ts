import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-devotion-iso',
  templateUrl: './devotion-iso.component.html'
})
export class DevotionIsoComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '40';
  @Input() height: string = '20';
}
