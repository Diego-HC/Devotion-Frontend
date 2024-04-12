import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {BadgeComponent} from '../../shared/badge/badge.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  template: `
    <div class="flex justify-center items-center h-[60vh]">
      <table class="w-full my-5 overflow-auto">
        <thead class="text-left font-medium">
        <tr class="border-none box-shadow-none">
          <th class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
            Tarea
          </th>
          <th class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
            Estado
          </th>
          <th class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
            Inicio
          </th>
          <th class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
            Fin
          </th>
          <th class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">
            Responsable
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="hover:bg-gray-50 border-2 font-robotoCondensed" *ngFor="let task of tasks">
          <td class="text-left px-4 py-2 font-semibold">
            <a href="/task/{{task.id}}">{{ task.name | slice:0:35 }}</a>
          </td>
          <!-- Conditional to change badge color -->
          <td
            class="px-6 py-2 whitespace-nowrap flex justify-between items-center overflow-auto text-center font-black font-inter">
            <app-badge *ngIf="task.status === 'En revisión'" [status]="task.status"></app-badge>
            <app-badge *ngIf="task.status === 'Completado'" [status]="task.status"></app-badge>
            <app-badge *ngIf="task.status === 'En proceso'" [status]="task.status"></app-badge>
            <app-badge *ngIf="task.status === 'No iniciado'" [status]="task.status"></app-badge>
          </td>
          <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.startDate }}</td>
          <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.dueDate }}</td>
          <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.asigneeId }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
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
}
