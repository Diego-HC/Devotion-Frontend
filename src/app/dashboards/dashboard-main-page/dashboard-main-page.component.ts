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


        <div class="w-52 h-52 grid" [ngClass]="{ hidden: !isEditing }">
          <div
            class="grid place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow place-self-center size-24 hover:cursor-pointer"
            (click)="startChange()"
          >
            <app-plus-icon
              fill="#2A4365"
              [width]="'45'"
              [height]="'45'"
            ></app-plus-icon>
          </div>
        </div>

        <div class="grid grid-cols-4 md:w-full md:mt-2 md:mb-6">

          <!--          <div-->
          <!--            className="grid grid-cols-3 gap-4"-->
          <!--            style={{ gridTemplateColumns:-->
          <!--          "repeat(auto-fill, minmax(400px, 1fr))" }}-->
          <!--    >-->
          <!--    {publications?.map(publication => (-->
          <!--    <div key={publication.id} className="transform transition-transform duration-200 hover:scale-[101%]">-->
          <!--    <RecentlyPublishedCard {...publication}/>-->
          <!--    </div>-->
          <!--    ))}-->
          <!--    </div>-->
          <!--          <div class="flex flex-wrap justify-content">-->
          <!--            <div class="col-span-2">-->
          <!--            <div class="w-1/2">-->
          <app-widget>
            <h3 class="font-bold mb-1.5">Progreso del proyecto</h3>
            <ngx-charts-gauge
              [view]="pieChartView"
              [results]="projectProgress"
              [scheme]="colorScheme"
              [max]="100"
              [min]="0"
            >
            </ngx-charts-gauge>
          </app-widget>
          <!--            </div>-->
          <!--          </div>-->

          <!--            <div class="col-span-2">-->
          <!--            <div class="w-1/2">-->
          <app-widget>
            <h3 class="font-bold mb-1.5">Tareas por estado</h3>
            <ngx-charts-pie-chart
              [view]="pieChartView"
              [results]="tasksByStatus"
              [doughnut]="false"
              [labels]="true"
              [maxLabelLength]="15"
              [scheme]="colorScheme"
            />
          </app-widget>
          <!--          </div>-->
          <!--          </div>-->


          <!--            <app-widget>-->
          <!--              <ngx-charts-number-card-->
          <!--                [view]="view"-->
          <!--                [results]="allDoneTasksCount"-->
          <!--                [scheme]="colorScheme"-->
          <!--              />-->
          <!--            </app-widget>-->
          <div class="col-span-2">
            <div class="md:w-full">
              <app-widget>
                <h3 class="font-bold mb-1.5">Tareas completadas por fecha</h3>
                <ngx-charts-line-chart
                  [view]="view"
                  [results]="doneTasksByDate"
                  [scheme]="colorScheme"
                  [xAxis]="true"
                  [yAxis]="true"
                >
                </ngx-charts-line-chart>
              </app-widget>
            </div>
          </div>

          <div class="col-span-2">
            <app-widget>
              <h3 class="font-bold mb-1.5">Tareas existentes por prioridad</h3>
              <ngx-charts-bar-horizontal
                [view]="view"
                [results]="tasksByPriority"
                [scheme]="colorScheme"
                [yAxis]="true"
              />
            </app-widget>
          </div>

          <!--          </div>-->
          <!--            <app-widget>-->
          <!--              <ngx-charts-advanced-pie-chart-->
          <!--                [view]="view"-->
          <!--                [results]="infoTasks"-->
          <!--                [scheme]="colorScheme"-->
          <!--                [gradient]="true"-->
          <!--                [animations]="true"-->
          <!--              />-->
          <!--            </app-widget>-->

          <div class="col-span-2">
            <app-widget>
              <h3 class="font-bold mb-1.5">Carga de trabajo por usuario</h3>
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
                [legend]="true"
              >
              </ngx-charts-heat-map>
            </app-widget>
          </div>

          <p>hardcoded number cards de número de tareas completadas del proyecto y arbol de tareas done</p>

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
  doneTasksCount: number = 0;
  allDoneTasksCount?: number = 0;
  doneTasksByDate?: any;
  tasksByStatus?: any;
  tasksByPriority?: any;
  userWorkload?: any;
  projectProgress: any;
  allProjectProgress: any;

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

  view: [number, number] = [400, 200]; // Default dimensions
  pieChartView: [number, number] = [400, 400];

  prueba = [
    {
      "name": "No Iniciada",
      "series": [
        {
          "name": "Semana 1",
          "value": 4
        },
        {
          "name": "Semana 2",
          "value": 23
        },
        {
          "name": "Semana 3",
          "value": 12
        },
        {
          "name": "Semana 4",
          "value": 45
        }
      ]
    },
    {
      "name": "En progreso",
      "series": [
        {
          "name": "Semana 1",
          "value": 10
        },
        {
          "name": "Semana 2",
          "value": 3
        },
        {
          "name": "Semana 3",
          "value": 30
        },
        {
          "name": "Semana 4",
          "value": 4
        }
      ]
    },
  ]

  // fetchApi1 = (onResponse?: () => void) => {
  //   this.api.get(`dashboards/${this.id}/`).subscribe((response: Dashboard) => {
  //     console.log(response);
  //
  //     this.projectName = response.projectName;
  //     this.tasksToDo = response.tasksToDo;
  //     this.tasksToVerify = response.tasksToVerify;
  //     this.widgets = response.widgets;
  //     this.widgets.sort((a, b) => a.position - b.position);
  //     this.dataSources = response.dataSources;
  //
  //     if (onResponse) {
  //       onResponse();
  //     }
  //   });
  // };

  fetchApi = (onResponse?: () => void) => {
  }



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
      this.doneTasksCount = response.doneTasksCount;
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
    // General view settings for larger charts
    const generalWidth = window.innerWidth * 0.4;
    const generalHeight = window.innerHeight * 0.2;
    this.view = [generalWidth, generalHeight];

    // Settings for pie charts to maintain a square and responsive
    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    const pieSize = smallerDimension * 0.35; // 25% of the smaller viewport dimension
    this.pieChartView = [pieSize, pieSize];
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
