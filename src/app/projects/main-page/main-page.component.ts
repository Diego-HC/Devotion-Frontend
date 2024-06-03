import { Component, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { cardColors } from "../../shared/cardColors";
import { Subscription} from "rxjs";
import {TaskPreviewComponent} from "../../tasks/task-preview/task-preview.component";
import { Clipboard } from "@angular/cdk/clipboard";

@Component({
  selector: "app-main-page",
  template: `
    <app-loading *ngIf="project === undefined"/>
    <app-breadcrumbs
      *ngIf="project !== undefined"
      [breadcrumbs]="project.breadcrumbs"
    />
    <div class="overflow-x-auto mx-20 my-4" *ngIf="project !== undefined">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-row justify-between gap-20">
          <div class="flex flex-col mb-7">
            <div class="flex flex-row gap-6">
              <h1 class="text-4xl font-helvetica">
                {{ project.name }}
              </h1>
              <div
                class="radial-progress bg-devotionSecondary text-devotionPrimary"
                [style]="{'--value':project.progress, '--size':'2rem', '--thickness': '0.5rem'}"
                role="progressbar"
              ></div>
            </div>
            <div class="flex flex-row items-center gap-4">
              <a
                href="{{ inviteId ? ('/invite/' + inviteId + '/dashboard') : ('/dashboard/' + project.id) }}"
                class="flex flex-row items-center gap-2"
              >
                <app-dashboard-icon
                  fill="#5CCEFF"
                  width="25"
                  height="25"
                ></app-dashboard-icon>
                <span
                  class="font-bold hover:underline text-base text-devotionAccent"
                >Ir a dashboard</span
                >
              </a>
              <a routerLink="{{ inviteId ? ('/invite/' + inviteId) : ('/projects/' + project.id) }}/members">
                <span class="font-bold hover:underline text-base text-devotionAccent">Ver miembros</span>
              </a>
              <div
                *ngIf="!inviteId"
                class="dropdown dropdown-right"
              >
                <div tabindex="0" role="button" class="text-lg cursor-pointer badge badge-outline text-[#5CCEFF]">•••</div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <button (click)="editProject()" class="flex flex-row gap-2">
                      <app-pencil-icon [detailed]="false" fill="#2A4365" width="15" height="15"/>
                      Editar
                    </button>
                  </li>
                  <li>
                    <button (click)="shareLink()" class="flex flex-row gap-2">
                      <app-pencil-icon fill="#2A4365" width="15" height="15"/>
                      {{ shareButtonText }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <p
              class="font-robotoCondensed text-lg my-4 max-w-3xl text-[#5E6377] font-normal"
            >
              {{ project.description }}
            </p>
          </div>

          <div class="mx-4 flex-grow">
            <h3 class="font-bold">Subproyectos:</h3>
            <div
              class="flex flex-col flex-wrap content-start gap-4 ml-2 mt-2 h-60 overflow-x-scroll"
            >
              @for (subproject of project.projects; track $index) {
                <app-subproject-card
                  [subproject]="subproject"
                  [colors]="cardColors[$index % cardColors.length]"
                />
              }
              <button
                *ngIf="!inviteId"
                (click)="newSubproject()"
                class="place-self-center w-[12.375rem] h-24"
                id="newSubprojectButton"
              >
                <div
                  class="flex flex-col place-items-center justify-center h-full"
                >
                  <div
                    class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow"
                  >
                    <app-plus-icon
                      fill="#2A4365"
                      width="15"
                      height="15"
                    ></app-plus-icon>
                  </div>
                  <span
                    class="font-robotoCondensed text-sm"
                  >Nuevo Subproyecto</span>
                </div>
              </button>
            </div>
          </div>
        </div>
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
            <button
              *ngIf="!inviteId"
              (click)="newTask()"
            >
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
            <div
              *ngIf="!inviteId"
              class="flex flex-row items-center gap-1"
            >
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
        [defaultTasks]="project.tasks"
        [projectOrTaskId]="project.id"
        [isTask]="false"
      />
      <app-kanban
        *ngIf="currentView === 'kanban'"
        [projectOrTaskId]="project.id"
        [isTask]="false"
      />
      <app-calendar
        *ngIf="currentView === 'calendar'"
        [projectOrTaskId]="project.id"
        [isTask]="false"
      />
      <app-roadmap *ngIf="currentView === 'roadmap'"
                   [defaultTasks]="project.tasks"
                   [projectOrTaskId]="project.id"
                   [isTask]="false"/>
    </div>
  `,
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(
    protected api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    protected store: StoreService,
    private clipboard: Clipboard
  ) {}

  @ViewChild(TaskPreviewComponent) taskPreview!: TaskPreviewComponent;

  @Input() projectId?: string;

  project?: ProjectResponse;
  inviteId = ""
  cardColors = cardColors;
  currentView: string = "table";
  isCopied = false;
  shareButtonText = "Compartir";

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    const getProject = (id: string) => {
      this.api.get(`projects/${id}/`).subscribe((response) => {
        this.store.updateProjectFromResponse(response);
        this.project = response;
      });
    };

    this.route.params.subscribe((params) => {
      if (params["id"]) {
        getProject(params["id"]);
      } else if (this.projectId) {
        this.inviteId = params["inviteId"];
        getProject(this.projectId);
      }
    });

    // Se necesita para actualizar la gráfica de progreso
    this.subscription = this.store.needsUpdate$.subscribe(() => this.updateProjectInfo());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateProjectInfo() {
    this.api.get(`projects/${this.project!.id}/?get=info`).subscribe((response) => {
      this.project = {
        ...this.project!,
        ...response,
      };
      this.store.disableButton = false;
    });
  }

  onTabClick(selected: string) {
    this.currentView = selected;
  }

  editProject() {
    this.store.userPool = [];
    void this.router.navigateByUrl("/edit/project");
  }

  newTask() {
    this.store.clearTask(this.store.project.id);
    void this.router.navigateByUrl("/new/task");
  }

  newSubproject() {
    this.store.clearProject(this.store.project.id);
    void this.router.navigateByUrl("/new/project");
  }

  shareLink() {
    this.api.post(`invites/`, {
      project: this.project!.id,
    }).subscribe((response) => {
      this.inviteId = response.id;
      const inviteLink = window.location.origin + "/invite/" + response.id;

      this.clipboard.copy(inviteLink);

      this.isCopied = true;
      this.shareButtonText = "¡Copiado!";

      setTimeout(() => {
        this.isCopied = false;
        this.shareButtonText = "Compartir";
      }, 1000);
    });
  }
}
