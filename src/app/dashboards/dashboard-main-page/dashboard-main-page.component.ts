import {Component, Input, DoCheck, OnInit, HostListener, HostBinding} from "@angular/core";
import { SessionStorageService } from "../../session-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { Subject } from "rxjs";
import { calculateViewDimensions, ColorHelper, BaseChartComponent, DataItem, LegendOptions, ViewDimensions, ScaleType,
  NgxChartsModule, Color } from "@swimlane/ngx-charts";

@Component({
  selector: "app-dashboard-main-page",
  template: `
    @if (tasksToDo && tasksToVerify) {
      <div class="ml-20 mr-10">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-semibold text-gray-800">
            {{ projectName }}
          </h1>
          <button class="mr-6" (click)="changeMode()">
            <app-pencil-icon fill="#000000" width="30" height="30"/>
          </button>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="{{ inviteId ? ('/invite/' + inviteId) : ('/project/' + id) }}"
            class="flex flex-row items-center gap-2"
          >
            <app-projects-icon fill="#5CCEFF" width="25" height="25"/>
            <span class="font-bold hover:underline text-base text-devotionAccent"
            >Ir a proyecto</span
            >
          </a>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full mt-2 mb-6">
          <div>
            <h3 class="font-bold mb-1.5">Tus tareas por completar</h3>
            <app-dashboard-task-list [tasks]="tasksToDo"/>
          </div>
          <div>
            <h3 class="font-bold mb-1.5">Tus tareas en verificación</h3>
            <app-dashboard-task-list [tasks]="tasksToVerify"/>
          </div>
        </div>


<!--        <div class="w-52 h-52 grid" [ngClass]="{ hidden: !isEditing }">-->
<!--          <p>ola</p>-->
<!--        </div>-->

        <div
          class="grid gap-4 mt-4 mb-8"
          style="grid-template-columns: repeat(auto-fill, minmax(400px, 1fr))"
        >
          <app-widget [isEditing]="isEditing" widgetName="Progreso del proyecto">
            <ngx-charts-gauge
              [view]="view"
              [results]="projectProgress"
              [scheme]="colorScheme"
              [max]="100"
              [min]="0"
            >
            </ngx-charts-gauge>
          </app-widget>
          <app-widget [isEditing]="isEditing" widgetName="Tareas por estado">
            <ngx-charts-pie-chart
              [view]="view"
              [results]="tasksByStatus"
              [doughnut]="false"
              [labels]="true"
              [maxLabelLength]="15"
              [scheme]="colorScheme"
            />
          </app-widget>
          <app-widget [isEditing]="isEditing" widgetName="Tareas completadas por fecha">
            <ngx-charts-line-chart
              [view]="view"
              [results]="doneTasksByDate"
              [scheme]="colorScheme"
              [xAxis]="true"
              [yAxis]="true"
            >
            </ngx-charts-line-chart>
          </app-widget>
          <app-widget [isEditing]="isEditing" widgetName="Tareas existentes por prioridad">
            <ngx-charts-bar-horizontal
              [view]="view"
              [results]="tasksByPriority"
              [scheme]="colorScheme"
              [yAxis]="true"
            />
          </app-widget>
          <app-widget [isEditing]="isEditing" widgetName="Carga de trabajo por usuario">
            <ngx-charts-heat-map
              [view]="view"
              [results]="userWorkload"
              [scheme]="colorScheme"
              [xAxis]="true"
              [showYAxisLabel]="true"
              [showXAxisLabel]="true"
              [xAxisLabel]="xAxisLabel"
              [yAxisLabel]="yAxisLabel"
              [yAxis]="true"
            >
            </ngx-charts-heat-map>
          </app-widget>
          <app-widget [isEditing]="isEditing">
            <ngx-charts-number-card
              [view]="view"
              [results]="doneTasksCount"
              [scheme]="cardColorScheme"
            >
            </ngx-charts-number-card>
          </app-widget>
        </div>
      </div>
      <!--      <app-create-widget-->
        <!--        [modal]="modal"-->
        <!--        [projectId]="id"-->
        <!--        [position]="widgets.length"-->
        <!--        [dataSources]="dataSources"-->
        <!--        [fetchApi]="fetchApi"-->
        <!--        [startChange$]="startChange$"-->
        <!--      />-->
        <!--      </div>-->
    } @else {
      <app-loading/>
    }
  `,
})
export class DashboardMainPageComponent implements OnInit, DoCheck {
  constructor(
    protected storage: SessionStorageService,
    private route: ActivatedRoute,
    protected api: ApiService,
    private store: StoreService,
    private router: Router
  ) {}

  @Input() projectId = "";

  tasksToDo?: DashboardTask[] = [];
  tasksToVerify?: DashboardTask[] = [];
  widgets?: Widget[];
  id = "";
  inviteId = "";

  modal: HTMLDialogElement | null = null;
  projectName = "";
  doneTasksCount?: NormalWidget[]; // number cards
  allDoneTasksCount?: NormalWidget[]; // number cards
  doneTasksByDate?: NormalWidget[] | WidgetsBySeries[]; // Line chart, vertical bar chart, horizontal bar chart, heat map
  tasksByStatus?: NormalWidget[] | WidgetsBySeries[]; // Pie chart, vertical bar chart, horizontal bar chart, heat map
  tasksByPriority?: NormalWidget[] | WidgetsBySeries[]; // Pie chart, vertical bar chart, horizontal bar chart, heat map
  userWorkload?: NormalWidget[] | WidgetsBySeries[]; // heat map, pie chart, vertical bar chart, horizontal bar chart, number cards
  projectProgress?: any // gauge
  allProjectProgress?: NormalWidget[]; // pendiente este rollito

  private startEditSubject = new Subject<void>();
  xAxisLabel = "Estados";
  yAxisLabel = "Semanas";

  startChange$ = this.startEditSubject.asObservable();

  isEditing = false;

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

  view: [number, number] = [400, 200]; // Default dimensions
  pieChartView: [number, number] = [400, 400];

  prueba = [
    {
      "name": "Tareas completadas",
      "value": 1
    }
  ]

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.id = params["id"];
      } else {
        this.id = this.projectId;
        this.inviteId = params["inviteId"];
      }
        this.projectName = this.store.project.name;
    this.api.get(`projects/${this.id}/dashboard/`).subscribe((response: any) => {
      console.log(response);
      this.projectName = response.name;
      this.tasksToDo = response.tasksToDo;
      this.tasksToVerify = response.tasksToVerify;
      this.doneTasksCount = this.prueba // response.doneTasksCount;
      this.allDoneTasksCount = response.allDoneTasksCount;
      this.doneTasksByDate = response.doneTasksByDate;
      this.tasksByStatus = response.tasksByStatus;
      this.tasksByPriority = response.tasksByPriority;
      this.userWorkload = response.userWorkload;
      this.projectProgress = response.projectProgress;
      this.allProjectProgress = response.allProjectProgress;
    });
      // this.fetchApi();
    });
    this.setViewDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setViewDimensions();
  }

  private setViewDimensions(): void {
    const windowWidth = window.innerWidth;
    const minColumnWidth = 400; // Minimum column width as per your grid style
    const numberOfColumns = Math.floor(windowWidth / minColumnWidth);
    const actualColumnWidth = windowWidth / numberOfColumns;

    // Set the width and height for the view
    this.view = [actualColumnWidth - 100, actualColumnWidth * 0.6 - 50]; // You can replace 200 with the desired height
    this.pieChartView = [actualColumnWidth, actualColumnWidth]; // If you want the height to be equal to the width
  }

  ngDoCheck(): void {
    this.modal = document.getElementById("modal") as HTMLDialogElement;
  }

  changeMode = () => {
    this.isEditing = !this.isEditing;
  };

  startChange(id?: string) {
    this.store.widget = this.widgets?.find((widget) => widget.id === id);
    console.log("Start change", this.store.widget);

    this.startEditSubject.next();
  }

}
