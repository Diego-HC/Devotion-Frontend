import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `
    <div
      class="inline-flex items-center px-2 py-px rounded-full text-xs font-medium leading-4 justify-between text-white"
      [class]="badgeClass">
      <div class="w-3 h-3 rounded-full bg-white p-[7px] m-1"></div>
      <span class="font-inter font-semibold">{{ status.toUpperCase() }}</span>
    </div>
  `,
})
export class BadgeComponent {
  @Input() status: string = '';

  get badgeClass(): string {
    switch (this.status) {
      case 'En revisión':
        return "bg-[#0094D3]";
      case 'Completado':
        return "bg-[#00D387]";
      case 'En proceso':
        return "bg-[#FFC700]";
      case 'No iniciado':
        return "bg-[#363636]";
      default:
        return '';
    }
  }
}
