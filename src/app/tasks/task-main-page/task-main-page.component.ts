import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { switchMap } from "rxjs";
import { TaskPreviewComponent} from "../task-preview/task-preview.component";

@Component({
  selector: "app-task-main-page",
  template: `
    <app-loading *ngIf="task === undefined"/>
    <app-breadcrumbs
      *ngIf="task !== undefined"
      [breadcrumbs]="task.breadcrumbs"
    />
    <div class="overflow-x-auto mx-20 my-4" *ngIf="task !== undefined">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-row justify-between gap-12">
          <div class="flex flex-row">
            <h1 class="text-4xl font-helvetica mr-3">
              {{ task.name }}
            </h1>
            <app-priority-icon [priority]="task.priority"/>
          </div>
          <div class="flex flex-row gap-24">
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Asignado</h2>
              <p class="font-robotoCondensed font-normal">
                {{ task.assignee.name }}
              </p>
            </div>
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Fecha Inicio</h2>
              <p class="font-robotoCondensed font-normal">
                {{ task.startDate }}
              </p>
            </div>
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Fecha Fin</h2>
              <p class="font-robotoCondensed font-normal">
                {{ task.dueDate }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center gap-4">
          <div class="dropdown dropdown-bottom">
            <app-badge
              [status]="statusName(task.status)"
              tabindex="0"
              role="button"
            ></app-badge>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52"
            >
              <li><a (click)="updateStatus(0)">No iniciado</a></li>
              <li><a (click)="updateStatus(1)">En proceso</a></li>
              <li><a (click)="updateStatus(2)">En revisión</a></li>
              <li><a (click)="updateStatus(3)">Completado</a></li>
            </ul>
          </div>
          <div class="dropdown dropdown-right">
            <div tabindex="0" role="button" class="text-lg cursor-pointer badge badge-outline text-[#5CCEFF]">•••</div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a class="flex flex-row gap-2" routerLink="/edit/task">
                <app-pencil-icon [detailed]="false" fill="#2A4365" width="15" height="15"/>
                Editar
              </a></li>
            </ul>
          </div>
        </div>
        <div class="md:mt-3">
          <app-alert
            *ngIf="showWarning"
            [message]="warningMessage"
          ></app-alert>
        </div>
        <p
          class="font-robotoCondensed text-lg my-4 max-w-3xl text-[#5E6377] font-normal"
        >
          {{ task.description }}
        </p>

        <h3 class="font-bold mb-4">Tareas</h3>
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center gap-5">
            <app-icon
              iconType="table"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-table-icon
                class="col-start-1 row-start-1"
                [fill]="currentView === 'table' ? '#FFFFFF' : '#2A4365'"
              ></app-table-icon>
            </app-icon>
            <app-icon
              iconType="kanban"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-kanban-icon
                class="col-start-1 row-start-1"
                [fill]="currentView === 'kanban' ? '#FFFFFF' : '#2A4365'"
              ></app-kanban-icon>
            </app-icon>
            <app-icon
              iconType="calendar"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-calendar-icon
                class="col-start-1 row-start-1"
                [fill]="currentView === 'calendar' ? '#FFFFFF' : '#2A4365'"
              ></app-calendar-icon>
            </app-icon>
            <app-icon
              iconType="roadmap"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-roadmap-icon
                class="col-start-1 row-start-1"
                [fill]="currentView === 'roadmap' ? '#FFFFFF' : '#2A4365'"
              />
            </app-icon>
            <button (click)="newTask()">
              <div class="flex flex-col place-items-center justify-center">
                <div
                  class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-2.5 box-shadow"
                >
                  <app-plus-icon
                    fill="#2A4365"
                    width="25"
                    height="25"
                  />
                </div>
                <span class="font-robotoCondensed">Nueva tarea</span>
              </div>
            </button>
          </div>
          <div class="flex flex-row items-center gap-5">
            <div class="flex flex-row items-center gap-1">
              <input
                [disabled]="store.loadingSubtasks"
                type="checkbox"
                id="showAssigned"
                name="showAssigned"
                class="h-5 w-5 text-devotionSecondary"
                (change)="store.showAssignedTasks = !store.showAssignedTasks"
              />
              <label for="showAssigned" class="font-robotoCondensed">Asignado a mí</label>
            </div>
            <div class="flex flex-row items-center gap-1">
              <input
                [disabled]="store.loadingSubtasks"
                type="checkbox"
                id="showSubtree"
                name="showSubtree"
                class="h-5 w-5 text-devotionSecondary"
                (change)="store.showSubtreeTasks = !store.showSubtreeTasks"
              />
              <label for="showSubtree" class="font-robotoCondensed">Subtareas</label>
            </div>
          </div>
        </div>
      </div>

      <app-table
        *ngIf="currentView === 'table'"
        [defaultTasks]="task.tasks"
        [projectOrTaskId]="task.id"
        [isTask]="true"
      />
      <app-kanban
        *ngIf="currentView === 'kanban'"
        [projectOrTaskId]="task.id"
        [isTask]="true"
      />
      <app-calendar
        *ngIf="currentView === 'calendar'"
        [projectOrTaskId]="task.id"
        [isTask]="true"
      />
      <app-roadmap *ngIf="currentView === 'roadmap'"/>
    </div>
  `
})
export class TaskMainPageComponent implements OnInit {
  constructor(private api: ApiService, protected store: StoreService, private route: ActivatedRoute, private router: Router) {}

  @ViewChild(TaskPreviewComponent) taskPreview!: TaskPreviewComponent;

  task?: TaskResponse;
  currentView = "table";
  dropdownOpen = false;
  showWarning = false;
  warningMessage = "";

  @Input() taskId?: string;

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.task = undefined;
          return this.api.get(`tasks/${params["id"]}/`);
        })
      )
      .subscribe((response) => {
        this.store.updateTaskFromResponse(response)
        this.task = response;
      });
  }

  statusName(status: number) {
    switch (status) {
      case 0:
        return "No iniciado";
      case 1:
        return "En proceso";
      case 2:
        return "En revisión";
      case 3:
        return "Completado";
      default:
        return "No iniciado";
    }
  }

  updateStatus(status: number) {
    this.api
      .put(`tasks/${this.task!.id}/status/`, { status: status })
      .subscribe(
        () => {
          this.task!.status = status;
          this.dropdownOpen = false;
        },
        (error) => {
          this.showWarning = true;
          this.warningMessage = error.error.message;
        }
      );
  }

  onTabClick(selected: string) {
    this.currentView = selected;
  }

  newTask() {
    this.store.clearTask(this.store.task.parentProject, this.store.task.id);
    void this.router.navigateByUrl("/new/task");
  }
}
