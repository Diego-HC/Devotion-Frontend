import {Component, Input, OnInit, HostListener} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { ScaleType, Color } from "@swimlane/ngx-charts";
import { WidgetDisplayType } from "../widget/widget-display-type";

@Component({
  selector: "app-dashboard-main-page",
  template: `
    @if (response) {
      <div class="ml-20 mr-10">
        <h1 class="text-3xl font-semibold text-gray-800">
          {{ response.name }}
        </h1>
        <div class="flex items-center gap-4">
          <a
            href="{{ inviteId ? ('/invite/' + inviteId) : ('/project/' + id) }}"
            class="flex flex-row items-center gap-2"
          >
            <app-projects-icon fill="#5CCEFF" width="25" height="25"/>
            <span
              class="font-bold hover:underline text-base text-devotionAccent"
            >Ir a proyecto</span>
          </a>
        </div>
        <div class="grid grid-cols-2 gap-4 w-full mt-2 mb-6">
          <div>
            <h3 class="font-bold mb-1.5">Tus tareas por completar</h3>
            <app-dashboard-task-list [tasks]="response.tasksToDo"/>
          </div>
          <div>
            <h3 class="font-bold mb-1.5">Tus tareas en verificación</h3>
            <app-dashboard-task-list [tasks]="response.tasksToVerify"/>
          </div>
        </div>
        <div
          class="grid gap-4 mt-4 mb-8"
          style="grid-template-columns: repeat(auto-fill, minmax(400px, 1fr))"
        >
          <app-widget
            metricName="Progreso del proyecto"
          >
            <ngx-charts-gauge
              [view]="view"
              [results]="response.projectProgress.data"
              [scheme]="colorScheme"
              [max]="100"
              [min]="0"
            >
            </ngx-charts-gauge>
          </app-widget>
          <app-widget
            metricId="tasks_by_status"
            metricName="Tareas por estado"
            [displayTypes]="[W.pie, W.verticalBar, W.horizontalBar]"
            (onDisplayTypeChange)="refetch($event)"
          >
            <ngx-charts-pie-chart
              *ngIf="response.tasksByStatus.displayType === W.pie.valueOf()"
              [view]="view"
              [results]="response.tasksByStatus.data"
              [doughnut]="false"
              [labels]="true"
              [maxLabelLength]="15"
              [scheme]="colorScheme"
            />
            <ngx-charts-bar-vertical
              *ngIf="response.tasksByStatus.displayType === W.verticalBar.valueOf()"
              [view]="view"
              [results]="response.tasksByStatus.data"
              [scheme]="colorScheme"
              [xAxis]="true"
              [showDataLabel]="true"
            />
            <ngx-charts-bar-horizontal
              *ngIf="response.tasksByStatus.displayType === W.horizontalBar.valueOf()"
              [view]="view"
              [results]="response.tasksByStatus.data"
              [scheme]="colorScheme"
              [yAxis]="true"
              [showDataLabel]="true"
            />
          </app-widget>
          <app-widget
            metricId="done_tasks_by_date"
            metricName="Tareas completadas por fecha"
            [displayTypes]="[W.line, W.verticalBar, W.horizontalBar, W.heatMap]"
            (onDisplayTypeChange)="refetch($event)"
          >
            <ngx-charts-line-chart
              *ngIf="response.doneTasksByDate.displayType === W.line.valueOf()"
              [view]="view"
              [results]="response.doneTasksByDate.data"
              [scheme]="colorScheme"
              [xAxis]="true"
              [yAxis]="true"
            />
            <ngx-charts-bar-vertical
              *ngIf="response.doneTasksByDate.displayType === W.verticalBar.valueOf()"
              [view]="view"
              [results]="response.doneTasksByDate.data"
              [scheme]="colorScheme"
              [xAxis]="true"
              [yAxis]="true"
              [showDataLabel]="true"
            />
            <ngx-charts-bar-horizontal
              *ngIf="response.doneTasksByDate.displayType === W.horizontalBar.valueOf()"
              [view]="view"
              [results]="response.doneTasksByDate.data"
              [scheme]="colorScheme"
              [yAxis]="true"
              [showDataLabel]="true"
            />
            <ngx-charts-heat-map
              *ngIf="response.doneTasksByDate.displayType === W.heatMap.valueOf()"
              [view]="view"
              [results]="response.doneTasksByDate.data"
              [scheme]="colorScheme"
              [xAxis]="true"
              [showYAxisLabel]="true"
              [showXAxisLabel]="true"
              [xAxisLabel]="xAxisLabel"
              [yAxisLabel]="yAxisLabel"
              [yAxis]="true"
            />
          </app-widget>
          <app-widget
            metricId="tasks_by_priority"
            metricName="Tareas existentes por prioridad"
            [displayTypes]="[W.pie, W.verticalBar, W.horizontalBar]"
            (onDisplayTypeChange)="refetch($event)"
          >
            <ngx-charts-bar-horizontal
              *ngIf="response.tasksByPriority.displayType === W.horizontalBar.valueOf()"
              [view]="view"
              [results]="response.tasksByPriority.data"
              [scheme]="colorScheme"
              [yAxis]="true"
              [showDataLabel]="true"
            />
            <ngx-charts-bar-vertical
              *ngIf="response.tasksByPriority.displayType === W.verticalBar.valueOf()"
              [view]="view"
              [results]="response.tasksByPriority.data"
              [scheme]="colorScheme"
              [xAxis]="true"
              [yAxis]="true"
              [showDataLabel]="true"
            />
            <ngx-charts-pie-chart
              *ngIf="response.tasksByPriority.displayType === W.pie.valueOf()"
              [view]="view"
              [results]="response.tasksByPriority.data"
              [doughnut]="false"
              [labels]="true"
              [maxLabelLength]="15"
              [scheme]="colorScheme"
            />
          </app-widget>
          <app-widget
            metricId="user_workload"
            metricName="Carga de trabajo por usuario"
            [displayTypes]="[W.heatMap, W.pie, W.verticalBar, W.horizontalBar, W.numbers]"
            (onDisplayTypeChange)="refetch($event)"
          >
            <ngx-charts-heat-map
              *ngIf="response.userWorkload.displayType === W.heatMap.valueOf()"
              [view]="view"
              [results]="response.userWorkload.data"
              [scheme]="colorScheme"
              [xAxis]="true"
              [showYAxisLabel]="true"
              [showXAxisLabel]="true"
              [xAxisLabel]="xAxisLabel"
              [yAxisLabel]="yAxisLabel"
              [yAxis]="true"
            />
            <ngx-charts-pie-chart
              *ngIf="response.userWorkload.displayType === W.pie.valueOf()"
              [view]="view"
              [results]="response.userWorkload.data"
              [doughnut]="false"
              [labels]="true"
              [maxLabelLength]="15"
              [scheme]="colorScheme"
            />
            <ngx-charts-bar-vertical
              *ngIf="response.userWorkload.displayType === W.verticalBar.valueOf()"
              [view]="view"
              [results]="response.userWorkload.data"
              [scheme]="colorScheme"
              [xAxis]="true"
              [yAxis]="true"
              [showDataLabel]="true"
            />
            <ngx-charts-bar-horizontal
              *ngIf="response.userWorkload.displayType === W.horizontalBar.valueOf()"
              [view]="view"
              [results]="response.userWorkload.data"
              [scheme]="colorScheme"
              [yAxis]="true"
              [showDataLabel]="true"
            />
            <ngx-charts-number-card
              *ngIf="response.userWorkload.displayType === W.numbers.valueOf()"
              [view]="view"
              [results]="response.userWorkload.data"
              [scheme]="cardColorScheme"
            />
          </app-widget>
          <app-widget
            metricName="Tareas completadas"
          >
            <ngx-charts-number-card
              [view]="view"
              [results]="response.doneTasksCount.data"
              [scheme]="cardColorScheme"
            />
          </app-widget>
          <app-widget
            metricName="Tareas completadas en total"
          >
            <ngx-charts-number-card
              [view]="view"
              [results]="response.allDoneTasksCount.data"
              [scheme]="cardColorScheme"
            />
          </app-widget>
        </div>
      </div>
    } @else {
      <app-loading/>
    }
  `,
})
export class DashboardMainPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private store: StoreService
  ) {}

  @Input() projectId = "";

  id = "";
  inviteId = "";
  response?: DashboardResponse;

  xAxisLabel = "Estados";
  yAxisLabel = "Semanas";

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#363636', "#FFC700", "#0094D3", "#00D387"]
  };

  cardColorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#C7FFCD"]
  }

  view: [number, number] = [400, 200];

  ngOnInit(): void {
    this.setViewDimensions();
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.id = params["id"];
      } else {
        this.id = this.projectId;
        this.inviteId = params["inviteId"];
      }
      this.api.get(`projects/${this.id}/dashboard/`).subscribe((response) => {
        this.response = response;
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event): void {
    this.setViewDimensions();
  }

  refetch({ metricId, displayType }: { metricId: string, displayType: number }) {
    this.store.updatingWidget = metricId;
    this.api.put(`projects/${this.id}/dashboard/`, {
      [metricId]: displayType,
    }).subscribe((response) => {
      this.response = response;
      this.store.updatingWidget = null;
    });
  };

  private setViewDimensions(): void {
    const windowWidth = window.innerWidth;
    const minColumnWidth = 400; // Minimum column width as per your grid style
    const numberOfColumns = Math.floor(windowWidth / minColumnWidth);
    const actualColumnWidth = windowWidth / numberOfColumns;

    // Set the width and height for the view
    this.view = [actualColumnWidth - 100, actualColumnWidth * 0.6 - 50]; // You can replace 200 with the desired height
  }

  // doneTasksCount - number cards
  // allDoneTasksCount - number cards
  // doneTasksByDate - Line chart, vertical bar chart, horizontal bar chart, heat map
  // tasksByStatus - Pie chart, vertical bar chart, horizontal bar chart, heat map
  // tasksByPriority - Pie chart, vertical bar chart, horizontal bar chart, heat map
  // userWorkload - heat map, pie chart, vertical bar chart, horizontal bar chart, number cards
  // projectProgress - gauge
  // allProjectProgress - pendiente este rollito

  protected readonly W = WidgetDisplayType;
}
