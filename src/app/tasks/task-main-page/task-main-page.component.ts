import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { switchMap } from "rxjs";

@Component({
  selector: "app-task-main-page",
  template: `
    <app-loading *ngIf="taskResponse === undefined" />
    <app-breadcrumbs
      *ngIf="taskResponse !== undefined"
      [breadcrumbs]="taskResponse.breadcrumbs"
    />
    <div class="overflow-x-auto mx-20 mt-4" *ngIf="taskResponse !== undefined">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-row justify-between gap-12">
          <div class="flex flex-row gap-6">
            <h1 class="text-4xl font-helvetica">
              {{ taskResponse.name }}
            </h1>
            <img
              src="../assets/coconut.webp"
              alt="Coconut"
              class="h-8 w-8 rounded-full col-start-1 row-start-1"
            />
            <div
              class="radial-progress bg-devotionSecondary text-devotionPrimary"
              style="--value:70; --size:2rem; --thickness: 0.5rem;"
              role="progressbar"
            ></div>
          </div>
          <div class="flex flex-row gap-24">
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Asignado</h2>
              <p class="font-robotoCondensed font-normal">
                {{ taskResponse.assignee.name }}
              </p>
            </div>
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Fecha Inicio</h2>
              <p class="font-robotoCondensed font-normal">
                {{ taskResponse.startDate }}
              </p>
            </div>
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Fecha Fin</h2>
              <p class="font-robotoCondensed font-normal">
                {{ taskResponse.dueDate }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center gap-4">
          <div class="dropdown dropdown-bottom">
            <app-badge
              [status]="statusName(taskResponse.status)"
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
              <li><a routerLink="/edit/task">Editar</a></li>
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
          {{ taskResponse.description }}
        </p>

        <div class="flex flex-col justify-between">
          <h3 class="font-bold md:mb-4 md:mt-12">Tareas</h3>
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
              [iconType]="'kanban'"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-kanban-icon
                class="col-start-1 row-start-1"
                [fill]="currentView === 'kanban' ? '#FFFFFF' : '#2A4365'"
              ></app-kanban-icon>
            </app-icon>
            <app-icon
              [iconType]="'calendar'"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-calendar-icon
                class="col-start-1 row-start-1"
                [fill]="currentView === 'calendar' ? '#FFFFFF' : '#2A4365'"
              ></app-calendar-icon>
            </app-icon>
            <app-icon
              [iconType]="'roadmap'"
              [selectedIcon]="currentView"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-roadmap-icon
                class="col-start-1 row-start-1"
                [fill]="currentView === 'roadmap' ? '#FFFFFF' : '#2A4365'"
              ></app-roadmap-icon>
            </app-icon>
            <button (click)="newTask()">
              <div class="flex flex-col place-items-center justify-center">
                <div
                  class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-2.5 box-shadow"
                >
                  <app-plus-icon
                    fill="#2A4365"
                    [width]="'25'"
                    [height]="'25'"
                  ></app-plus-icon>
                </div>
                <span class="font-robotoCondensed">Nueva tarea</span>
              </div>
            </button>
          </div>
          <app-table
            *ngIf="currentView === 'table'"
            [tasks]="taskResponse!.tasks"
          />
          <app-kanban *ngIf="currentView === 'kanban'" />
          <app-calendar *ngIf="currentView === 'calendar'" [projectOrTaskId]="taskResponse.id" [isTask]="true"/>
          <app-roadmap *ngIf="currentView === 'roadmap'" />
        </div>
      </div>
    </div>
  `
})
export class TaskMainPageComponent implements OnInit {
  constructor(private api: ApiService, private store: StoreService, private route: ActivatedRoute, private router: Router) {}

  taskResponse?: TaskData;
  currentView = "table";
  dropdownOpen = false;
  showWarning = false;
  warningMessage = "";

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.taskResponse = undefined;
          return this.api.get(`tasks/${params["id"]}/`);
        })
      )
      .subscribe((response) => {
        this.store.updateTaskFromResponse(response)
        this.taskResponse = response;
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
      .put(`tasks/${this.taskResponse!.id}/status/`, { status: status })
      .subscribe(
        () => {
          this.taskResponse!.status = status;
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
    this.router.navigateByUrl("/new/task");
  }
}
