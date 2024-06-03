import { Component, HostBinding } from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-copied-link',
  template: `
    <p class="bg-white text-sm text-devotionPrimary p-1 px-4 rounded-md border border-devotionPrimary">
      Link copiado al portapapeles
    </p>
  `,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CopiedLinkComponent {
  @HostBinding('@fade') fade = true;
}
