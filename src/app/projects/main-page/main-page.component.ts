import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { bgBlack, bgBlue } from "ansi-colors";
import { ApiService} from "../../api.service";

export interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;

  subprojects?: Project[];
}

@Component({
  selector: "app-main-page",
  template: `
    <div class="overflow-x-auto mx-20">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-row justify-between gap-20">
          <div class="flex flex-col mb-7 gap-2">
            <div class="flex flex-row gap-6">
              <h1 class="text-4xl font-helvetica">
                {{ response?.name ?? "Loading..." }}
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
              @for (subproject of this.response?.subprojects; track subproject.id)
              {
              <app-subproject-card [subproject]="subproject" />
              }
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
              href="/new/task?Parent={{ project.id }}&Type=[Task]"
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
  project: Project = {
    id: 0,
    name: "",
    description: "",
    progress: 0,
    subprojects: [],
  };

  response: any;

  constructor(private api: ApiService) {

    // Replace this with your actual JSON data source
    this.project = {
      id: 1,
      name: "FSAE 2024",
      description:
        "Ser la mejor escudería en al competencia SAE Formula Student con un vehículo monoplaza reconocido por\n          nuestra excelencia en el diseño y construcción. Aspiramos a inspirar a las generaciones futuras\n          demostrando que con pasión, determinación y trabajo en equipo podemos alcanzar nuestros objetivos en el\n          mundo del automovilismo.",
      progress: 50,

      subprojects: [
        {
          id: 1,
          name: "Diseño",
          description: "Diseñar un vehículo monoplaza de carreras",
          progress: 70,
        },
        {
          id: 2,
          name: "Fabricación",
          description:
            "Construir el vehículo monoplaza de carreras Construir el vehículo monoplaza de carreras",
          progress: 30,
        },
        {
          id: 3,
          name: "Pruebas",
          description: "Realizar pruebas de rendimiento del vehículo",
          progress: 10,
        },
        {
          id: 4,
          name: "Marketing",
          description: "Promocionar la escudería en redes sociales",
          progress: 90,
        },
        {
          id: 5,
          name: "Finanzas",
          description: "Administrar el presupuesto de la escudería",
          progress: 40,
        },
        {
          id: 6,
          name: "Recursos Humanos",
          description: "Gestionar el equipo de trabajo",
          progress: 60,
        },
        {
          id: 7,
          name: "Logística",
          description: "Coordinar la logística de la escudería",
          progress: 20,
        },
        {
          id: 8,
          name: "Innovación",
          description: "Investigar y proponer mejoras en el vehículo",
          progress: 80,
        },
        {
          id: 9,
          name: "Sustentabilidad",
          description: "Implementar prácticas sustentables en la escudería",
          progress: 50,
        },
      ],
    };
  }

  currentView: string = "table"; // Default view
  selectedIcon: string = "table";

  onTabClick(selected: string) {
    this.currentView = selected;
    this.selectedIcon = selected;
  }

  ngOnInit() {
    this.api.get('projects/887ebfdd-bd39-417c-9b42-90396c2b8e59/').subscribe((response) => {
      console.log(response);
      this.response = response;
    });
  }

  protected readonly bgBlack = bgBlack;
  protected readonly bgBlue = bgBlue;
}
