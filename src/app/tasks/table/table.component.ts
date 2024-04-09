import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { BadgeComponent } from '../../shared/badge/badge.component';

@Component({
  selector: 'app-table',
  template: `
    <div class="w-full md:w-3/4 lg:w-3/4 mx-auto">
<!--      <div class="overflow-x-auto border border-gray-100 rounded-lg">-->
        <table class="table-auto">
          <thead class="bg-gray-100 font-medium">
          <tr class="header-row">
            <th class="text-left italic px-4 py-2 no-border">Tarea</th>
            <th class="text-left italic px-4 py-2 no-border">Estado</th>
            <th class="text-left italic px-4 py-2 no-border">Inicio</th>
            <th class="text-left italic px-4 py-2 no-border">Fin</th>
            <th class="text-left italic px-4 py-2 no-border">Responsable</th>
          </tr>
          </thead>
          <tbody>
          <tr class="hover:bg-gray-50 opacity-50" *ngFor="let task of tasks">
            <td class="task-name">{{ task.name }}</td>
            <!-- Conditional to change badge color -->
            <td class="badges">
              <app-badge *ngIf="task.status === 'En revisión'" [status]="task.status" class="badge-onReview"></app-badge>
              <app-badge *ngIf="task.status === 'Completado'" [status]="task.status" class="badge-done"></app-badge>
              <app-badge *ngIf="task.status === 'En proceso'" [status]="task.status" class="badge-doing"></app-badge>
              <app-badge *ngIf="task.status === 'No iniciado'" [status]="task.status" class="badge-toDo"></app-badge>
            </td>
            <td class="text-left px-4 py-2">{{ task.startDate }}</td>
            <td class="text-left px-4 py-2">{{ task.dueDate }}</td>
            <td class="text-left px-4 py-2">{{ task.asigneeId }}</td>
          </tr>
          </tbody>
        </table>
<!--      </div>-->
    </div>
  `,
  styles: [`
   .table {
      @apply w-full;
     overflow: auto;
    }

   .thead {
      @apply text-left;
    }

    th,
    td {
      @apply px-6 py-3;
      white-space: nowrap;
      overflow: auto;
      /*border: 1px solid gray;*/
    }

    th {
      @apply text-left italic;
    }

    th {
      @apply text-gray-500;
    }

    tr {
      border: 1px solid gray;
    }

    .header-row {
      border: none;
    }

    tr:hover {
      /*@apply bg-gray-100;*/
      @apply bg-gray-50 opacity-50;
    }

   /* Additional styling for task name */
   .task-name {
     @apply text-left px-4 py-2 font-bold;
     padding-left: 2rem;
   }

   .badges {
     @apply px-6 py-3;
     white-space: nowrap;
     display: flex;
     justify-content: center;
     align-items: center;
     overflow: auto;
   }

   .no-border {
      border: none !important;
   }
  `]
})
export class TableComponent {
  tasks = [
    {
      name: 'Junta sprint - Grupo Chasis',
      status: 'Completado',
      startDate: '16 de marzo',
      dueDate: '16 de marzo',
      asigneeId: 'Alfonso Hernandez'
    },
    {
      name: 'Revisión de planos',
      status: 'En revisión',
      startDate: '12 de marzo',
      dueDate: '14 de marzo',
      asigneeId: 'Mario Bros'
    },
    {
      name: 'Junta sprint - Grupo Suspensión',
      status: 'No iniciado',
      startDate: '19 de marzo',
      dueDate: '21 de marzo',
      asigneeId: 'Max Verstappen'
    },
    {
      name: 'Junta sprint - Grupo Motor',
      status: 'En proceso',
      startDate: '22 de marzo',
      dueDate: '24 de marzo',
      asigneeId: 'Lewis Hamilton'
    }
  ];
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
