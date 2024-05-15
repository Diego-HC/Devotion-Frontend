import { Component, DoCheck, OnInit } from "@angular/core";
import { SessionStorageService } from "../../session-storage.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";

@Component({
  selector: "app-dashboard-main-page",
  template: `
    @if (tasksToDo && tasksToVerify && widgets) {
    <div class="ml-20 mr-10">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-semibold text-gray-800">
          {{ projectName }}
        </h1>
        <button class="mr-6" (click)="startEdit()">
          <app-projects-icon fill="#000000" width="60" height="60" />
        </button>
      </div>
      <div class="flex items-center gap-4">
        <a
          href="{{ '/project/' + id }}"
          class="flex flex-row items-center gap-2"
        >
          <app-projects-icon fill="#5CCEFF" width="25" height="25" />
          <span class="font-bold hover:underline text-base text-devotionAccent"
            >Ir a proyecto</span
          >
        </a>
        <button (click)="viewDataSources()">
          <span class="font-bold hover:underline text-base text-devotionAccent"
            >Ver entradas de datos</span
          >
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 w-full mt-2 mb-6">
        <div>
          <h3 class="font-bold mb-1.5">Tus tareas por completar</h3>
          <app-dashboard-task-list [tasks]="tasksToDo" />
        </div>
        <div>
          <h3 class="font-bold mb-1.5">Tus tareas en verificación</h3>
          <app-dashboard-task-list [tasks]="tasksToVerify" />
        </div>
      </div>

      <div class="flex flex-wrap gap-x-8 gap-y-6 mb-10">
        @for(widget of widgets; track $index) {
        <app-widget [widget]="widget" />
        }
        <div class="w-52 h-52 grid" [ngClass]="{ hidden: !isEditing }">
          <div
            class="grid place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow place-self-center size-24 hover:cursor-pointer"
            (click)="modal?.showModal()"
          >
            <app-plus-icon
              fill="#2A4365"
              [width]="'45'"
              [height]="'45'"
            ></app-plus-icon>
          </div>
        </div>
      </div>

      <app-create-widget
        [modal]="modal"
        [projectId]="id"
        [position]="widgets.length"
        [dataSources]="dataSources"
        [fetchApi]="fetchApi"
      />
    </div>
    } @else {
    <app-loading />
    }
  `,
})
export class DashboardMainPageComponent implements OnInit, DoCheck {
  tasksToDo?: TaskDashboard[];
  tasksToVerify?: TaskDashboard[];
  widgets?: Widget[];
  id = "";
  projectName = "";
  dataSources: DataSource[] = [];

  modal: HTMLDialogElement | null = null;

  isEditing = false;

  constructor(
    protected storage: SessionStorageService,
    private route: ActivatedRoute,
    protected api: ApiService,
    private store: StoreService,
    private router: Router,
  ) {}

  fetchApi = () => {
    this.api.get(`dashboards/${this.id}/`).subscribe((response: Dashboard) => {
      console.log(response);

      this.projectName = response.projectName;
      this.tasksToDo = response.tasksToDo;
      this.tasksToVerify = response.tasksToVerify;
      this.widgets = response.widgets;
      this.widgets.sort((a, b) => a.position - b.position);
      this.dataSources = response.dataSources;
    });
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];

      this.fetchApi();
    });
  }

  ngDoCheck(): void {
    this.modal = document.getElementById("modal") as HTMLDialogElement;
  }

  addWidget() {
    console.log("Add widget");
  }

  startEdit = () => {
    this.isEditing = !this.isEditing;
  };

  viewDataSources() {
    this.store.dataSources = this.dataSources;
    this.store.project.id = this.id;
    console.log("View members", this.store.dataSources, this.store.project.id);
    void this.router.navigateByUrl(`/dashboard/${this.id}/dataSources`);
  }
}
