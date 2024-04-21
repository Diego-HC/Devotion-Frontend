import { Component, OnInit,EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { bgBlack, bgBlue } from "ansi-colors";
import { ApiService} from "../../api.service";
import {AuthGoogleService} from "../../auth-google.service";

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;

  subprojects?: Project[];
  tasks?: any[];
}

@Component({
  selector: "app-main-page",
  template: `
    <app-loading *ngIf="response === undefined" />
    <app-breadcrumbs
      *ngIf="response !== undefined"
      [breadcrumbs]="response.breadcrumbs"
    />
    <div class="overflow-x-auto mx-20 mt-4" *ngIf="response !== undefined">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-row justify-between gap-20">
          <div class="flex flex-col mb-7 gap-2">
            <div class="flex flex-row gap-6">
              <h1 class="text-4xl font-helvetica">
                {{ response.name }}
              </h1>
              <div
                class="radial-progress bg-[#E1EFFF] text-[#2A4365]"
                style="--value:70; --size:2rem; --thickness: 0.5rem;"
                role="progressbar"
              ></div>
            </div>
            <div class="flex flex-row items-center gap-4">
              <a href="/dashboard" class="flex flex-row items-center gap-2">
                <app-dashboard-icon
                  fill="#5CCEFF"
                  width='25'
                  height='25'
                ></app-dashboard-icon>
                <span class="font-bold hover:underline text-base text-[#5CCEFF]"
                  >Ir a dashboard</span
                >
              </a>
              <a
                href="/edit/project/{{ response.id }}"
                class="flex flex-row items-center gap-2"
              >
                <span
                  class="text-lg cursor-pointer badge badge-outline text-[#5CCEFF]"
                  >•••</span
                >
              </a>
            </div>
            <p
              class="font-robotoCondensed text-lg my-4 max-w-3xl text-[#5E6377] font-normal"
            >
              {{ response.description }}
            </p>
          </div>

          <div class="mx-4 flex-grow">
            <h3 class="font-bold">Subproyectos:</h3>
            <div
              class="flex flex-col flex-wrap content-start gap-4 ml-2 mt-2 h-60 overflow-x-scroll"
            >
              @for (subproject of this.response?.projects; track subproject.id)
              {
              <app-subproject-card [subproject]="subproject" />
              }
              <a href="/new/project" class="place-self-center w-[15.5rem]" (click)="sendDatatoNewProject(response.id)">
                <div class="flex flex-col place-items-center justify-center">
                  <div class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow">
                    <app-plus-icon
                      fill="#2A4365"
                      [width]="'15'"
                      [height]="'15'"
                    ></app-plus-icon>
                  </div>
                  <span class="font-robotoCondensed text-sm">Nuevo Subproyecto</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <h3 class="font-bold mb-4">Tareas</h3>
          <div class="flex flex-row items-center gap-5">
            <app-icon
              iconType='table'
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-table-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'table' ? '#FFFFFF' : '#2A4365'"></app-table-icon>
            </app-icon>
            <app-icon
              iconType='kanban'
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-kanban-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'kanban' ? '#FFFFFF' : '#2A4365'"></app-kanban-icon>
            </app-icon>
            <app-icon
              iconType='calendar'
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-calendar-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'calendar' ? '#FFFFFF' : '#2A4365'"></app-calendar-icon>
            </app-icon>
            <app-icon
              iconType='roadmap'
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-roadmap-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'roadmap' ? '#FFFFFF' : '#2A4365'"></app-roadmap-icon>
            </app-icon>
            <a
              href="/new/task?Parent={{ response.id }}&Type=[Task]"
              (click)="onTabClick('newTask')"
            >
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
            </a>
          </div>
        </div>
      </div>

      <app-table *ngIf="currentView === 'table'" [tasks]="response?.tasks" />
      <app-kanban *ngIf="currentView === 'kanban'" />
      <app-calendar *ngIf="currentView === 'calendar'" />
      <app-roadmap *ngIf="currentView === 'roadmap'" />
    </div>
  `,
})
export class MainPageComponent implements OnInit {
  response: any;

  constructor(protected api: ApiService, private route: ActivatedRoute, private auth: AuthGoogleService) { }

  currentView: string = "table"; // Default view
  selectedIcon: string = "table";
  // To send the parentId to the new project page
  @Output() parentProject= new EventEmitter<string>();

  onTabClick(selected: string) {
    this.currentView = selected;
    this.selectedIcon = selected;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.api.get(`projects/${params["id"]}/`).subscribe((response) => {
        this.response = response;
      });
    });
  }

  sendDatatoNewProject(parentProjectId: string) {
    this.parentProject.emit(parentProjectId);
  }

  protected readonly bgBlack = bgBlack;
  protected readonly bgBlue = bgBlue;
}
