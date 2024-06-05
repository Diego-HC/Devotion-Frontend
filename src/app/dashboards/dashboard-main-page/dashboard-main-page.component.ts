import { Component, Input, DoCheck, OnInit } from "@angular/core";
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

        <div class="flex flex-wrap gap-x-8 gap-y-6 mb-10">
          @for (widget of widgets; track $index) {
            <div class="grid grid-cols-1 grid-rows-1 relative">
              <app-widget [widget]="widget" class="row-start-1 col-start-1"/>
              @if (isEditing) {
                <button
                  class="btn btn-sm row-start-1 col-start-1 absolute top-2 right-2"
                  (click)="startChange(widget.id)"
                >
                  Edit
                </button>
              }
            </div>
          }
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
        <div class="flex flex-row flex-wrap">
          <ngx-charts-pie-chart
            [view]="[400,200]"
            [results]="infoTasks"
            [doughnut]="false"
            [labels]="true"
            [maxLabelLength]="15"
            [scheme]="colorScheme"
          />

          <ngx-charts-advanced-pie-chart
            [view]="[400,200]"
            [results]="infoTasks"
            [scheme]="colorScheme"
            [gradient]="true"
            [animations]="true"
          />

          <ngx-charts-bar-vertical
            [view]="[400,200]"
            [results]="infoTasks"
            [scheme]="colorScheme"
            [xAxis]="true"
          />

          <ngx-charts-bar-horizontal
            [view]="[200,400]"
            [results]="infoTasks"
            [scheme]="colorScheme"
            [yAxis]="true"
          />

          <ngx-charts-heat-map
            [view]="[200,200]"
            [results]="prueba"
            [scheme]="colorScheme"
            [xAxis]="true"
            [yAxis]="true"
          >
          </ngx-charts-heat-map>

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
      </div>
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

  tasksToDo?: DashboardTask[] = [
    {
      id: "1",
      name: "Tarea 1",
      description: "Esta es la tarea 1",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    },
    {
      id: "2",
      name: "Tarea 2",
      description: "Esta es la tarea 2",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    },
    {
      id: "3",
      name: "Tarea 3",
      description: "Esta es la tarea 3",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    },
    {
      id: "4",
      name: "Tarea 4",
      description: "Esta es la tarea 4",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    }
  ]
  tasksToVerify?: DashboardTask[] = [
    {
      id: "5",
      name: "Tarea 5",
      description: "Esta es la tarea 5",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    },
    {
      id: "6",
      name: "Tarea 6",
      description: "Esta es la tarea 6",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    },
    {
      id: "7",
      name: "Tarea 7",
      description: "Esta es la tarea 7",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    },
    {
      id: "8",
      name: "Tarea 8",
      description: "Esta es la tarea 8",
      parentProject: "FSAE 2024",
      dueDate: "2021-06-30",
      priority: 1,
    }
  ];
  widgets?: Widget[];
  id = "";
  inviteId = "";
  projectName = "Hola";
  dataSources: DataSource[] = [];
  modal: HTMLDialogElement | null = null;
  infoTasks: any;
  private startEditSubject = new Subject<void>();

  startChange$ = this.startEditSubject.asObservable();

  isEditing = false;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#363636', "#FFC700", "#0094D3", "#00D387"]
  };

  prueba = [
    {
      "name": "Tareas",
      "series": [
        {
          "name": "No iniciadas",
          "value": 4
        },
        {
          "name": "En progreso",
          "value": 23
        },
        {
          "name": "En revisión",
          "value": 12
        },
        {
          "name": "Completadas",
          "value": 45
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
    this.api.get(`projects/${this.id}/dashboard/`).subscribe((response: any) => {
      console.log(response);
      this.infoTasks = response.tasks_by_status;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.id = params["id"];
      } else {
        this.id = this.projectId;
        this.inviteId = params["inviteId"];
      }
      this.fetchApi();
      console.log(this.tasksToDo);
    });
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
