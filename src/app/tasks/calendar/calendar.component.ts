import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from "../../api.service";
import { CalendarService } from "./calendar.service";

@Component({
  selector: 'app-calendar',
  template: `
    <app-tasks-loading *ngIf="response === undefined" />
    <table class="w-full table" *ngIf="calendar !== undefined">
      <thead>
      <tr>
        <th>{{ title }}</th>
        @for (weekday of weekdays; track $index) {
          <th>{{ weekday }}</th>
        }
      </tr>
      </thead>
      <tbody class="border">
        @for (week of calendar.matrix; track weekIndex; let weekIndex = $index) {
          <tr class="h-32">
            @for (cellData of week; track $index) {
              <td class="w-[calc(100%/7)] h-32 p-0 border">
                <app-calendar-cell
                  class="h-32"
                  [date]="cellData.date"
                  [isToday]="calendar.today[0] === weekIndex && calendar.today[1] === $index"
                  [tasks]="cellData.tasks"
                />
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `
})
export class CalendarComponent implements OnInit {
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Enero"];
  weekdays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  constructor(private api: ApiService, protected calService: CalendarService) { }

  @Input() projectOrTaskId: string = '';
  @Input() isTask: boolean = false;

  calendar?: {matrix: CalendarCellData[][], today: number[]};
  response?: MainPageProjectCalendarView;
  title: string = '';

  ngOnInit() {
    this.calendar = this.calService.generateCalendarMatrix();
    const startDate = this.calendar!.matrix[0][0].date;
    const startMonth = startDate!.getMonth();
    this.title = `${this.months[startMonth]}/${this.months[startMonth + 1]} ${startDate!.getFullYear()}`;

    const endpoint = `${this.isTask ? "tasks" : "projects"}/${this.projectOrTaskId}/?view=calendar&partial=true`;
    this.api.get(endpoint).subscribe((response: MainPageProjectCalendarView) => {
      this.response = response;
      for (const taskData of response.tasks) {
        const [calendarRow, calendarCol] = taskData.date;
        this.calendar!.matrix[calendarRow][calendarCol].tasks = taskData.tasks;
      }
    });
  }
}
