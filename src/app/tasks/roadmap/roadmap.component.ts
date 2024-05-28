import { Component,  Input, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ApiService} from "../../api.service";
import {StoreService} from "../../store.service";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { OAuthModule } from "angular-oauth2-oidc";
import { ComponentFixture, TestBed } from "@angular/core/testing";

@Component({
  selector: 'app-roadmap',
  template: `
    <p>
      roadmap works!
    </p>
    <app-tasks-loading *ngIf="store.loadingSubtasks" />
    <div *ngIf="tasks !== undefined">
      <table class="w-full mt-5" #headerTable>
        <thead class="text-left font-medium">
        <tr class="border-none box-shadow-none">
          <th class="font-roboto text-left italic px-4 py-2 no-border whitespace-nowrap overflow-auto text-[#676767]">Tarea</th>
        </tr>
        </thead>
      </table>
      <div class="w-full mb-8 max-h-[480px] overflow-y-auto">
        <table class="w-full" #bodyTable>
          <tbody>
          <tr class="cursor-pointer hover:bg-gray-50 border-2 font-robotoCondensed" *ngFor="let task of tasks"(click)="showTaskPreview(task.id)">
            <td class="text-left px-4 py-2 font-semibold"> {{ task.name | slice:0:35 }}</td>
            <td class="text-left px-4 py-2 text-[#5E6377]">{{ getFormattedDates(task.startDate, task.dueDate) }}</td>
            <td
              class="py-2 pr-6 whitespace-nowrap flex text-center items-center">
              <app-badge *ngIf="task.status === 0" [status]="'No iniciado'"></app-badge>
              <app-badge *ngIf="task.status === 1" [status]="'En proceso'"></app-badge>
              <app-badge *ngIf="task.status === 2" [status]="'En revisión'"></app-badge>
              <app-badge *ngIf="task.status === 3" [status]="'Completado'"></app-badge>
            </td>
            <td class="py-2 pr-6 whitespace-nowrap flex text-center items-center">
                <div class="calendar">
                  <div *ngFor="let month of getMonthsInRange(task.startDate, task.dueDate)" class="month">
                    <div class="month-name">{{ month.name }}</div>
                    <div class="days">
                      <div *ngFor="let day of month.days" [class.active]="isActiveDay(task.startDate, task.dueDate, month.index, day)">
                        {{ day }}
                      </div>
                    </div>
                  </div>
                </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <app-task-preview *ngIf="selectedTaskId" [taskID]="selectedTaskId" (closePreview)="closeTaskPreview()"></app-task-preview>

  `,
  styles: [`
    .calendar {
      display: flex;
      flex-direction: column;
    }
    .month {
      margin-bottom: 10px;
    }
    .month-name {
      font-weight: bold;
      margin-top: 5px;
    }
    .days {
      display: flex;
      flex-wrap: wrap;
    }
    .days div {
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 2px;
      background-color: #f0f0f0;
    }
    .days .active {
      background-color: #add8e6;
    }
  `]
})
export class RoadmapComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private api: ApiService, protected store: StoreService) { }

  @ViewChild('headerTable') headerTable!: ElementRef;
  @ViewChild('bodyTable') bodyTable!: ElementRef;

  @Input() defaultTasks?: TableTask[];
  @Input() projectOrTaskId = ""
  @Input() isTask = false;

  tasks?: TableTask[];
  selectedTaskId: string | null = null;

  private subscriptions = new Subscription();

  ngOnInit() {
    const _updateTasks = this.updateTasks.bind(this);
    this.subscriptions.add(this.store.showAssignedTasks$.subscribe(_updateTasks));
    this.subscriptions.add(this.store.showSubtreeTasks$.subscribe(_updateTasks));
    this.subscriptions.add(this.store.needsUpdate$.subscribe(() => this.updateTasks(true)));
    this.updateTasks()
  }

  ngAfterViewInit() {
    this.applyColumnWidths();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  updateTasks(force = false) {
    if (!force && !this.store.showAssignedTasks && !this.store.showSubtreeTasks) {
      this.tasks = this.defaultTasks;
      setTimeout(() => this.applyColumnWidths(), 0);
      return;
    }
    this.store.loadingSubtasks = true;
    const endpoint = `${this.isTask ? "tasks" : "projects"}/${this.projectOrTaskId}/?get=tasks&assigned=${this.store.showAssignedTasks}&subtree=${this.store.showSubtreeTasks}`;
    this.api.get(endpoint).subscribe((response) => {
      this.tasks = response.tasks;
      setTimeout(() => this.applyColumnWidths(), 0);
      this.store.loadingSubtasks = false;
    });
  }

  applyColumnWidths() {
    if (this.headerTable?.nativeElement && this.bodyTable?.nativeElement) {
      const headerRows = this.headerTable.nativeElement.rows;
      const bodyRows = this.bodyTable.nativeElement.rows;
  
      if (bodyRows.length > 0) {
        for (let i = 0; i < headerRows[0].cells.length; i++) {
          const bodyWidth = bodyRows[0].cells[i].offsetWidth;
          headerRows[0].cells[i].style.width = `${bodyWidth}px`;
        }
      }
    } else {
      console.warn('headerTable o bodyTable no están disponibles');
    }
  }

  showTaskPreview(taskId: string) {
    this.selectedTaskId = taskId;
  }

  closeTaskPreview() {
    this.selectedTaskId = null;
  }
  getFormattedDates(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate()) {
      return `${start.getDate()} ${this.getMonthName(start.getMonth())} ${start.getFullYear()}`;
    } else {
      return `${start.getDate()} ${this.getMonthName(start.getMonth())} ${start.getFullYear()} - ${end.getDate()} ${this.getMonthName(end.getMonth())} ${end.getFullYear()}`;
    }
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return monthNames[monthIndex];
  }
  getMonthsInRange(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];

    for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
      const monthIndex = d.getMonth();
      const daysInMonth = new Date(d.getFullYear(), monthIndex + 1, 0).getDate();
      months.push({
        name: this.getMonthName(monthIndex),
        days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
        index: monthIndex
      });
    }

    return months;
  }

  isActiveDay(startDate: string, endDate: string, month: number, day: number): boolean {
    const start = new Date(startDate);
    start.setDate(start.getDate() - 1);
    const end = new Date(endDate);
    const date = new Date(start.getFullYear(), month, day);

    return date >= start && date <= end;
  }

}

