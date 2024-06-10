import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-cell',
  template: `
    <div [className]="'h-full flex flex-col justify-start ' + (isToday ? 'bg-blue-50 border border-devotionPrimary rounded-md' : '')" *ngIf="date !== undefined">
      <p [className]="'ml-1 ' + (isToday ? 'font-bold text-devotionPrimary' : 'text-gray-300')">{{ date.getDate() }} {{  (isToday || date.getDate() == 1) ? months[date.getMonth()] : "" }}</p>
      <div class="overflow-y-scroll">
        @for (task of tasks; track task.id) {
          <app-calendar-task
            [task]="task"
            [allowNavigation]="allowNavigation"
          />
        }
      </div>
    </div>
  `
})
export class CalendarCellComponent {
  months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  @Input() date?: Date;
  @Input() isToday: boolean = false;
  @Input() tasks: CalendarTask[] = [];
  @Input() allowNavigation = true;
}
