import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {bgBlack, bgBlue} from "ansi-colors";

interface Project {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: "app-main-page",
  template: `
    <div class="overflow-x-auto mx-20">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-col justify-between mb-7 gap-2">
          <h1 class="text-4xl font-bold">
            {{ project.name }}
          </h1>
          <div class="flex flex-row items-center gap-4">
            <a href="/dashboard" class="flex flex-row items-center gap-2">
              <img
                src="../assets/coconut.webp"
                alt="Coconut"
                class="h-6 w-6 rounded-full"
              />
              <span
                class="font-bold hover:underline text-base text-[#5CCEFF]"
              >Ir a dashboard</span
              >
            </a>
            <span
              class="text-lg cursor-pointer badge badge-outline text-[#5CCEFF]"
            >•••</span
            >
          </div>
        </div>
        <p
          class="font-robotoText text-lg mb-4 max-w-3xl text-[#5E6377]"
        >
          {{ project.description }}
        </p>
        <div class="flex flex-col justify-between">
          <h3 class="font-bold mb-4">Tareas</h3>
          <div class="flex flex-row items-center gap-5">
            <a data-view="table" (click)="onTabClick('table')">
              <div>
                <span class="col-start-1 row-start-1"></span>
                <div class="flex flex-col place-items-center justify-center">
                  <div class="grid grid-cols-1 grid-rows-1 place-items-center h-10">
                    <span class="col-start-1 row-start-1 bg-[#2A4365] rounded-full p-6"
                          [ngClass]="{'hidden':this.selectedIcon !== 'table'}"></span>
                    <img
                      src="../assets/coconut.webp"
                      alt="Coconut"
                      class="h-6 w-6 rounded-full col-start-1 row-start-1"
                    />
                  </div>
                  <p>Tabla</p>
                </div>
              </div>
            </a>
            <a data-view="kanban" (click)="onTabClick('kanban')">
              <div class="flex flex-col place-items-center justify-center">
                <div class="grid grid-cols-1 grid-rows-1 place-items-center h-10">
                  <span class="col-start-1 row-start-1 bg-[#2A4365] rounded-full p-6"
                        [ngClass]="{'hidden':this.selectedIcon !== 'kanban'}"></span>
                  <img
                    src="../assets/coconut.webp"
                    alt="Coconut"
                    class="h-6 w-6 rounded-full col-start-1 row-start-1"
                  />
                </div>
                <span>Kanban</span>
              </div>
            </a>
            <a data-view="calendar" (click)="onTabClick('calendar')">
              <div class="flex flex-col place-items-center justify-center">
                <div class="grid grid-cols-1 grid-rows-1 place-items-center h-10">
                  <span class="col-start-1 row-start-1 bg-[#2A4365] rounded-full p-6"
                        [ngClass]="{'hidden':this.selectedIcon !== 'calendar'}"></span>
                  <img
                    src="../assets/coconut.webp"
                    alt="Coconut"
                    class="h-6 w-6 rounded-full col-start-1 row-start-1"
                  />
                </div>
                <span>Calendario</span>
              </div>
            </a>
            <a data-view="roadmap" (click)="onTabClick('roadmap')">
              <div class="flex flex-col place-items-center justify-center">
                <div class="grid grid-cols-1 grid-rows-1 place-items-center h-10">
                  <span class="col-start-1 row-start-1 bg-[#2A4365] rounded-full p-6"
                        [ngClass]="{'hidden':this.selectedIcon !== 'roadmap'}"></span>
                  <img
                    src="../assets/coconut.webp"
                    alt="Coconut"
                    class="h-6 w-6 rounded-full col-start-1 row-start-1"
                  />
                </div>
                <span>Roadmap</span>
              </div>
            </a>
            <a href="/new/task?Parent={{project.id}}&Type=[Task]" (click)="onTabClick('newTask')">
              <div class="flex flex-col place-items-center justify-center">
                <div class="grid grid-cols-1 grid-rows-1 place-items-center h-10">
                  <img
                    src="../assets/coconut.webp"
                    alt="Coconut"
                    class="h-6 w-6 rounded-full"
                  />
                </div>
                <span>Nueva tarea</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <app-table *ngIf="currentView === 'table'"/>
      <app-kanban *ngIf="currentView === 'kanban'"/>
      <app-calendar *ngIf="currentView === 'calendar'"/>
      <app-roadmap *ngIf="currentView === 'roadmap'"/>
      <app-task-create-edit-page *ngIf="currentView === 'newTask'"/>
    </div>
  `,
})
export class MainPageComponent {
  project: Project = {
    id: 0,
    name: "",
    description: "",
  };

  constructor() {
    // Replace this with your actual JSON data source
    this.project = {
      id: 1,
      name: "FSAE 2024",
      description:
        "Ser la mejor escudería en al competencia SAE Formula Student con un vehículo monoplaza reconocido por\n          nuestra excelencia en el diseño y construcción. Aspiramos a inspirar a las generaciones futuras\n          demostrando que con pasión, determinación y trabajo en equipo podemos alcanzar nuestros objetivos en el\n          mundo del automovilismo",
    };
  }

  currentView: string = "table"; // Default view
  selectedIcon: string = "table";

  onTabClick(selected: string) {
    this.currentView = selected;
    this.selectedIcon = selected;
  }

  protected readonly bgBlack = bgBlack;
  protected readonly bgBlue = bgBlue;
}
