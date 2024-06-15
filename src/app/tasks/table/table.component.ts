import {Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ApiService} from "../../api.service";
import {StoreService} from "../../store.service";

@Component({
  selector: 'app-table',
  template: `
    <app-tasks-loading *ngIf="store.loadingSubtasks" />
    <div
      *ngIf="tasks !== undefined"
    >
      <table class="w-full mt-5" #headerTable>
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
      </table>
      <div class="w-full mb-8 max-h-[400px] overflow-y-auto">
        <table class="w-full" #bodyTable>
          <tbody>
          <tr class="cursor-pointer hover:bg-gray-50 border-2 font-robotoCondensed" *ngFor="let task of tasks"
              (click)="showTaskPreview(task.id)">
            <td class="text-left px-4 py-2 font-semibold">
              {{ task.name | slice:0:35 }}
            </td>
            <td
              class="py-2 pr-6 whitespace-nowrap flex text-center items-center">
              <app-badge *ngIf="task.status === 0" [status]="'No iniciado'"></app-badge>
              <app-badge *ngIf="task.status === 1" [status]="'En proceso'"></app-badge>
              <app-badge *ngIf="task.status === 2" [status]="'En revisión'"></app-badge>
              <app-badge *ngIf="task.status === 3" [status]="'Completado'"></app-badge>
            </td>
            <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.startDate }}</td>
            <td class="text-left px-4 py-2 text-[#5E6377]">{{ task.dueDate }}</td>
            <td class="text-left px-4 py-2 text-[#5E6377] truncate">{{ task.assignee }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <app-task-preview *ngIf="selectedTaskId" [taskID]="selectedTaskId" (closePreview)="closeTaskPreview()"></app-task-preview>
  `,
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
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
    if (!this.headerTable || !this.bodyTable) return;

    const headerRows = this.headerTable.nativeElement.rows;
    const bodyRows = this.bodyTable.nativeElement.rows;

    if (bodyRows.length > 0) {
      for (let i = 0; i < headerRows[0].cells.length; i++) {
        const bodyWidth = bodyRows[0].cells[i].offsetWidth;
        headerRows[0].cells[i].style.width = `${bodyWidth}px`;
      }
    }
  }

  showTaskPreview(taskId: string) {
    this.selectedTaskId = taskId;
  }

  closeTaskPreview() {
    this.selectedTaskId = null;
  }
}
