import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription, from} from "rxjs";
import {ApiService} from "../../api.service";
import {StoreService} from "../../store.service";

import { selfData } from './data';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
//import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';

@Component({
  selector: 'app-roadmap',
  template: `
    <p>
     
    </p>
    <ejs-gantt height="300px"
    [dataSource]="data"
    [taskFields]="taskSettings">
    
    
    <e-columns>
        <e-column field='TaskName' headerText='Tarea' width='250'></e-column>
          <ng-template #template let-data>
              <div *ngFor="let task of tasks" (click)="navigateToTask(task.id)">
              {{ task.name | slice:0:35 }}
              </div>
          </ng-template>
        <e-column field='Date' headerText='Date' width='150'>
            <ng-template #template let-data>
                <div>{{getFormattedDates(data.StartDate, data.EndDate)}}</div>
            </ng-template>
        </e-column>
    </e-columns>
    </ejs-gantt>
    
  `,
  
})
export class RoadmapComponent implements OnInit {
  
  public data : Object[] = selfData;
  /*public data : DataManager = new DataManager({
    url: 'https://ej2services.syncfusion.com/production/web-services/api/GanttData',
    adaptor: new WebApiAdaptor,
    crossDomain: true
  });*/
  public toolbarOptions: any = ["ExpandAll", "CollapseAll"];
  public taskSettings: Object = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate'
  }; 


  constructor(private router: Router, private api: ApiService, protected store: StoreService) { }

  @ViewChild('headerTable') headerTable!: ElementRef;
  @ViewChild('bodyTable') bodyTable!: ElementRef;

  @Input() defaultTasks?: Task[];
  @Input() projectOrTaskId = ""
  @Input() isTask = false;

  private subscriptions = new Subscription();
  tasks?: Task[];

  ngOnInit(): void {
    this.subscriptions.add(this.store.showAssignedTasks$.subscribe(() => this.updateTasks()));
    this.subscriptions.add(this.store.showSubtreeTasks$.subscribe(() => this.updateTasks()));
    this.updateTasks()
  }
  updateTasks() {
    if (!this.store.showAssignedTasks && !this.store.showSubtreeTasks) {
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

  navigateToTask(taskId: string) {
    this.router.navigate(['/task', taskId]);
  }

  ngAfterViewInit() {
    this.applyColumnWidths();
  }

  applyColumnWidths() {
    const headerRows = this.headerTable.nativeElement.rows;
    const bodyRows = this.bodyTable.nativeElement.rows;

    if (bodyRows.length > 0) {
      for (let i = 0; i < headerRows[0].cells.length; i++) {
        const bodyWidth = bodyRows[0].cells[i].offsetWidth;
        headerRows[0].cells[i].style.width = `${bodyWidth}px`;
      }
    }
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

          
}
