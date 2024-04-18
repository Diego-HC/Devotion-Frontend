import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  template: `
    <div class="flex justify-center items-center">
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
        <tr class="cursor-pointer hover:bg-gray-50 border-2 font-robotoCondensed" *ngFor="let task of tasks" (click)="navigateToTask(task.id)" >
          <td class="text-left px-4 py-2 font-semibold">
            {{ task.name | slice:0:35 }}
          </td>
          <td
            class="px-6 py-2 whitespace-nowrap flex justify-between items-center overflow-auto text-center font-black font-inter">
            <app-badge *ngIf="task.status === 0" [status]="'No iniciado'"></app-badge>
            <app-badge *ngIf="task.status === 1" [status]="'En proceso'"></app-badge>
            <app-badge *ngIf="task.status === 2" [status]="'En revisión'"></app-badge>
            <app-badge *ngIf="task.status === 3" [status]="'Completado'"></app-badge>
          </td>
          <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.startDate }}</td>
          <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.dueDate }}</td>
          <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.asignee }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class TableComponent {

  @Input() tasks?: any[];
  @Input() taskId: string = '';
  @Output() taskClicked = new EventEmitter<string>();
  // @Output() allTasks = new EventEmitter<any[]>();

  constructor(private router: Router) { }


  navigateToTask(taskId: string) {
    this.taskClicked.emit(taskId);
  }
}
