import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  template: `
    <div class="table-container">
        <table class="table-test">
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
            <td class="task-name">
              <a [routerLink]="getTaskLink(task.id)">{{ task.name | slice:0:35 }}</a>
            </td>
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
    </div>
  `,
  styles: [`
   .table-test {
      @apply w-full ml-20 mr-60;
     overflow: auto;
    }

   .thead {
      @apply text-left;
    }

    th,
    td {
      @apply font-robotoText px-6 py-3;
      white-space: nowrap;
      overflow: auto;
      /*box-shadow: 0px 0px 8px rgba(0,0,0.08);*/
      /*border: 1px solid gray;*/
    }

    th {
      @apply text-left italic;
    }

    th {
      @apply text-gray-500;
    }

    tr {
      border: 1px solid rgba(128, 128, 128, 0.5);
      box-shadow: 0px 0px 2px rgba(0,0,0.02);
    }

    .header-row {
      border: none;
      box-shadow: none;
    }

    .header-row:hover {
      background-color: inherit;
      opacity: 1;
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
     justify-content: space-between;
     align-items: center;
     overflow: auto;
     text-align: center;
   }

   .no-border {
      border: none !important;
   }

    .table-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60vh;
    }

  `]
})
export class TableComponent {
  tasks = [
    {
      id: 1,
      name: 'Junta sprint - Grupo Chasis',
      status: 'Completado',
      startDate: '16 de marzo',
      dueDate: '16 de marzo',
      asigneeId: 'Alfonso Hernandez'
    },
    {
      id: 2,
      name: 'Revisión de planos',
      status: 'En revisión',
      startDate: '12 de marzo',
      dueDate: '14 de marzo',
      asigneeId: 'Mario Bros'
    },
    {
      id: 3,
      name: 'Junta sprint - Grupo Suspensión',
      status: 'No iniciado',
      startDate: '19 de marzo',
      dueDate: '21 de marzo',
      asigneeId: 'Max Verstappen'
    },
    {
      id: 4,
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

  constructor(private router: Router) {}
  getTaskLink(taskId: number): string[] {
    return ['/task', taskId.toString()];
  }
}
