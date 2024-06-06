import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-protected-link',
  template: `
    <a
      [routerLink]="isInvite ? null : href"
    >
      <ng-content></ng-content>
    </a>
  `
})
export class ProtectedLinkComponent {
  @Input() href!: string;
  isInvite = window.location.pathname.includes('invite');
}
