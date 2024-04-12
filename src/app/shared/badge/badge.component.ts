import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `
    <div class="badge" [class]="badgeClass">
      <div class="circle"></div>
      <span>{{ status }}</span>
    </div>
  `,
  styles: [`
      .badge {
        @apply inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium leading-4;
        /*position: relative;*/
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*right: 50px;*/
      }

      .badge span {
        @apply font-bold;
      }

      .circle {
        @apply w-3 h-3 rounded-full bg-white;
        /*left: -1px;*/
        /*top: 50%;*/
        /*transform: translateY(-50%);*/
        padding-right: 7px;
        margin-right: 7px;
      }

      .badge-onReview {
        /*@apply bg-blue-100 text-blue-800;*/
        background-color: #0094D3; /* Use the hexadecimal color code */
        color: #FFFFFF; /* Example text color */
      }

      .badge-done {
        /*@apply bg-green-100 text-green-800;*/
        background-color: #00D387;
        color: #FFFFFF;
      }

      .badge-doing {
        /*@apply bg-yellow-100 text-yellow-800;*/
        background-color: #FFC700;
        color: #FFFFFF;
      }

      .badge-toDo {
        /*@apply bg-red-100 text-red-800;*/
        background-color: #363636;
        color: #FFFFFF;
      }
  `]
})
export class BadgeComponent {
  @Input() status: string = '';

  get badgeClass(): string {
    switch (this.status) {
      case 'En revisión':
        return 'badge-onReview';
      case 'Completado':
        return 'badge-done';
      case 'En proceso':
        return 'badge-doing';
      case 'No iniciado':
        return 'badge-toDo';
      default:
        return '';
    }
  }
}
