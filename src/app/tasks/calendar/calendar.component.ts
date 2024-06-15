import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { TaskPreviewComponent} from "../task-preview/task-preview.component";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { CalendarService } from "./calendar.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-calendar',
  template: `
    <app-tasks-loading *ngIf="store.loadingSubtasks" />
    <table class="w-full table" *ngIf="calendar !== undefined" #calendarTable>
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
          <tr [className]="cellHeight">
            @for (cellData of week; track $index) {
              <td [className]="'w-[calc(100%/7)] p-0 border ' + cellHeight">
                <app-calendar-cell
                  [className]="cellHeight"
                  [date]="cellData.date"
                  [isToday]="calendar.today[0] === weekIndex && calendar.today[1] === $index"
                  [tasks]="cellData.tasks"
                  [allowNavigation]="allowNavigation"
                />
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Enero"];
  weekdays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  constructor(
    private api: ApiService,
    protected calService: CalendarService,
    protected store: StoreService,
    protected cdr: ChangeDetectorRef
  ) { }

  @ViewChild('calendarTable') calendarTable!: ElementRef<HTMLTableElement>;
  @ViewChild(TaskPreviewComponent) taskPreview!: TaskPreviewComponent;

  @Input() projectOrTaskId: string = '';
  @Input() isTask: boolean = false;
  @Input() allowNavigation: boolean = !window.location.pathname.includes('invite')
  @Input() forceShowSubtasks: boolean = false;

  calendar?: {matrix: CalendarCell[][], today: number[]};
  response?: CalendarResponse;
  title: string = '';

  private subscriptions = new Subscription();

  ngOnInit() {
    const _generateCalendar = this.generateCalendar.bind(this);
    this.subscriptions.add(this.store.showAssignedTasks$.subscribe(_generateCalendar));
    this.subscriptions.add(this.store.showSubtreeTasks$.subscribe(_generateCalendar));
    this.subscriptions.add(this.store.needsUpdate$.subscribe(_generateCalendar));
  }

  ngAfterViewInit() {
    if (this.calendarTable.nativeElement.scrollWidth < 1000) {
      this.useShortNames();
    }
    this.generateCalendar();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  generateCalendar() {
    this.calendar = this.calService.generateCalendarMatrix();
    const startDate = this.calendar!.matrix[0][0].date;
    const startMonth = startDate!.getMonth();
    if (this.calendarTable.nativeElement.scrollWidth >= 1000) {
      this.title = `${this.months[startMonth]}/${this.months[startMonth + 1]} ${startDate!.getFullYear()}`;
    }

    this.store.loadingSubtasks = true;
    const endpoint = `${this.isTask ? "tasks" : "projects"}/${this.projectOrTaskId}/?get=tasks&view=calendar&assigned=${this.store.showAssignedTasks}&subtree=${this.forceShowSubtasks || this.store.showSubtreeTasks}`;
    this.api.get(endpoint).subscribe((response: CalendarResponse) => {
      this.response = response;
      for (const taskData of response.tasks) {
        const [calendarRow, calendarCol] = taskData.date;
        this.calendar!.matrix[calendarRow][calendarCol].tasks = taskData.tasks;
      }
      this.store.loadingSubtasks = false;
    });
  }

  useShortNames() {
    this.title = "D";
    this.weekdays = ["L", "M", "M", "J", "V", "S"];
  }

  get cellHeight() {
    if (this.calendarTable?.nativeElement.scrollWidth < 1000) {
      return "h-24";
    }
    return "h-32";
  }
}
