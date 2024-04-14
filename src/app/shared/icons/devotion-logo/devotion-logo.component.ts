import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-devotion-logo',
  templateUrl: './devotion-logo.component.html',
})
export class DevotionLogoComponent {
  @Input() fill: string = '#2a4365';
  @Input() width: string = '146';
  @Input() height: string = '40';
}
