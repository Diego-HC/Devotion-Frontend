import { Component, OnInit } from "@angular/core";
import { SessionStorageService } from "../../session-storage.service";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { WidgetDisplayType } from "../widgets/widget-display-type";

@Component({
  selector: "app-dashboard-main-page",
  template: `
    @if (tasksToDo && tasksToVerify && widgets) {
    <div class="ml-20 mr-10">
      <div class="flex justify-between mb-1 items-center">
        <h1 class="text-3xl font-semibold text-gray-800">
          {{ projectName }}
        </h1>
        <button class="mr-6">
          <app-projects-icon fill="#000000" width="60" height="60" />
        </button>
      </div>
      <a href="{{ '/project/' + id }}" class="flex flex-row items-center gap-2">
        <app-projects-icon fill="#5CCEFF" width="25" height="25" />
        <span class="font-bold hover:underline text-base text-devotionAccent"
          >Ir a proyecto</span
        >
      </a>
      <div class="grid grid-cols-2 gap-4 w-full mt-4 mb-8 ">
        <div class="">
          <h3 class="font-bold mb-1.5">Tus tareas por completar</h3>
          <app-dashboard-task-list [tasks]="tasksToDo" />
        </div>
        <div class="">
          <h3 class="font-bold mb-1.5">Tus tareas en verificación</h3>
          <app-dashboard-task-list [tasks]="tasksToVerify" />
        </div>
      </div>
      <div class="flex flex-wrap gap-8">
        @for(widget of widgets; track $index) {
        <app-widget [widget]="widget" />
        }
        <div class="w-52 h-52 grid" (click)="(addWidget)">
          <div
            class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow place-self-center w-24 h-24"
          >
            <app-plus-icon
              fill="#2A4365"
              [width]="'45'"
              [height]="'45'"
            ></app-plus-icon>
          </div>
        </div>
      </div>
    </div>
    } @else {
    <app-loading />
    }
  `,
})
export class DashboardMainPageComponent implements OnInit {
  tasksToDo?: TaskDashboard[];
  tasksToVerify?: TaskDashboard[];
  widgets?: Widget[];
  id = "";
  projectName = "";

  constructor(
    protected storage: SessionStorageService,
    private route: ActivatedRoute,
    protected api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      console.log(this.id);

      // this.api
      //   .get(`dashboards/${this.projectId}/`)
      //   .subscribe((response: any) => {
      //     console.log(response);
      //   });
      const response: Dashboard = {
        projectName: "ola",
        tasksToDo: [
          {
            id: "ab753637-81ed-42bf-8405-2dc13cc0f2e8",
            name: "ola",
            description: "ola",
            priority: 0,
            dueDate: "2024-05-16",
            parentProject: "ola",
          },
          {
            id: "a957c1fe-161a-404b-8ad7-2ed9370d07c3",
            name: "aoue",
            description: "oei",
            priority: 0,
            dueDate: "2024-05-30",
            parentProject: "ola",
          },
          {
            id: "ab753637-81ed-42bf-8405-2dc13cc0f2e8",
            name: "ola",
            description: "ola",
            priority: 0,
            dueDate: "2024-05-16",
            parentProject: "ol",
          },
          {
            id: "a957c1fe-161a-404b-8ad7-2ed9370d07c3",
            name: "aoue",
            description: "oei",
            priority: 0,
            dueDate: "2024-05-30",
            parentProject: "ola2",
          },
          {
            id: "ab753637-81ed-42bf-8405-2dc13cc0f2e8",
            name: "ola",
            description: "ola",
            priority: 0,
            dueDate: "2024-05-16",
            parentProject: "ol",
          },
          {
            id: "a957c1fe-161a-404b-8ad7-2ed9370d07c3",
            name: "aoue",
            description: "oei",
            priority: 0,
            dueDate: "2024-05-30",
            parentProject: "ola2",
          },
          {
            id: "ab753637-81ed-42bf-8405-2dc13cc0f2e8",
            name: "ola",
            description: "ola",
            priority: 0,
            dueDate: "2024-05-16",
            parentProject: "ol",
          },
          {
            id: "a957c1fe-161a-404b-8ad7-2ed9370d07c3",
            name: "aoue",
            description: "oei",
            priority: 0,
            dueDate: "2024-05-30",
            parentProject: "ola2",
          },
          {
            id: "ab753637-81ed-42bf-8405-2dc13cc0f2e8",
            name: "ola",
            description: "ola",
            priority: 0,
            dueDate: "2024-05-16",
            parentProject: "ol",
          },
          {
            id: "a957c1fe-161a-404b-8ad7-2ed9370d07c3",
            name: "aoue",
            description: "oei",
            priority: 0,
            dueDate: "2024-05-30",
            parentProject: "ola2",
          },
        ],
        tasksToVerify: [
          {
            id: "43a21696-4f18-48e1-9dc0-7793e2bdbdcd",
            name: "a",
            description: "oal",
            priority: 0,
            dueDate: "2024-05-13",
            parentProject: "ola3",
          },
        ],
        widgets: [
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "ola",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 1,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura4",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 4,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura2",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 2,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 0,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura5",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 5,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura3",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 3,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura5",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 5,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura3",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 3,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura5",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 5,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura3",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 3,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura5",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 5,
            unit: "°C",
          },
          {
            id: "2b2e4d4e-3d8e-4c5f-8d0b-7a0f1f0f1f0f",
            name: "Temperatura3",
            displayType: WidgetDisplayType.Number,
            mqttTopic: "a",
            position: 3,
            unit: "°C",
          },
        ],
      };

      this.projectName = response.projectName;
      this.tasksToDo = response.tasksToDo;
      this.tasksToVerify = response.tasksToVerify;
      this.widgets = response.widgets;
      this.widgets.sort((a, b) => a.position - b.position);
    });
  }

  addWidget() {
    console.log("Add widget");
  }
}
