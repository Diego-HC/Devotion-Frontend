import { Component } from '@angular/core';
import {Project} from "../../projects/main-page/main-page.component";

export interface Task {
  id: number;
  name: string;
  status: string;
  startDate: string;
  dueDate: string;
  asigneeId: string;
  description: string;
}

@Component({
  selector: 'app-task-main-page',
  template: `
    <div class="overflow-x-auto mx-20">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-row justify-between gap-12">
          <div class="flex flex-row gap-6">
            <h1 class="text-4xl font-helvetica">
              {{ task.name }}
            </h1>
            <img
              src="../assets/coconut.webp"
              alt="Coconut"
              class="h-8 w-8 rounded-full col-start-1 row-start-1"
            />
            <div
              class="radial-progress bg-[#E1EFFF] text-[#2A4365]"
              style="--value:70; --size:2rem; --thickness: 0.5rem;"
              role="progressbar"
            ></div>
          </div>
          <div class="flex flex-row gap-24">
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Asignado</h2>
              <p class="font-robotoCondensed font-normal">{{ task.asigneeId }}</p>
            </div>
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Fecha Inicio</h2>
              <p class="font-robotoCondensed font-normal">{{ task.startDate }}</p>
            </div>
            <div class="flex flex-col">
              <h2 class="font-roboto font-bold">Fecha Fin</h2>
              <p class="font-robotoCondensed font-normal">{{ task.dueDate }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center gap-4">
          <div class="dropdown dropdown-bottom">
            <app-badge [status]="taskStatus" tabindex="0" role="button"></app-badge>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52">
              <li><a (click)="updateStatus('No iniciado')">No iniciado</a></li>
              <li><a (click)="updateStatus('En proceso')">En proceso</a></li>
              <li><a (click)="updateStatus('En revisión')">En revisión</a></li>
              <li><a (click)="updateStatus('Completado')"> Completado</a></li>
            </ul>
          </div>
          <a
            href="/edit/project/{{ task.id }}"
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
          {{ task.description }}
        </p>

        <div class="flex flex-col justify-between">
          <h3 class="font-bold md:mb-4 md:mt-12">Tareas</h3>
          <div class="flex flex-row items-center gap-5">
            <app-icon
              [iconType]="'table'"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-table-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'table' ? '#FFFFFF' : '#2A4365'"></app-table-icon>
            </app-icon>
            <app-icon
              [iconType]="'kanban'"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-kanban-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'kanban' ? '#FFFFFF' : '#2A4365'"></app-kanban-icon>
            </app-icon>
            <app-icon
              [iconType]="'calendar'"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-calendar-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'calendar' ? '#FFFFFF' : '#2A4365'"></app-calendar-icon>
            </app-icon>
            <app-icon
              [iconType]="'roadmap'"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-roadmap-icon class="col-start-1 row-start-1" [fill]="selectedIcon === 'roadmap' ? '#FFFFFF' : '#2A4365'"></app-roadmap-icon>
            </app-icon>
            <a
              href="/new/task?Parent={{ task.id }}&Type=[Task]"
              (click)="onTabClick('newTask')"
            >
              <div class="flex flex-col place-items-center justify-center md:mt-4">
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
          <app-table *ngIf="currentView === 'table'" />
          <app-kanban *ngIf="currentView === 'kanban'" />
          <app-calendar *ngIf="currentView === 'calendar'" />
          <app-roadmap *ngIf="currentView === 'roadmap'" />
        </div>
      </div>
    </div>
  `
})
export class TaskMainPageComponent {
  task: Task = {
    id: 0,
    name: "",
    status: "",
    startDate: "",
    dueDate: "",
    asigneeId: "",
    description: ""
  };

  constructor() {
    this.task = {
      id: 1,
      name: 'Junta sprint - Grupo Chasis',
      status: 'Completado',
      startDate: '16 de marzo',
      dueDate: '16 de marzo',
      asigneeId: 'Alfonso Hernandez',
      description: 'Junta de revisión de sprint con el grupo de chasis'
    }
  }

  dropdownOpen = false;
  taskStatus = "En proceso";

  updateStatus(status: string) {
    this.taskStatus = status;
    this.dropdownOpen = false;
  }

  currentView: string = "table"; // Default view
  selectedIcon: string = "table";

  onTabClick(selected: string) {
    this.currentView = selected;
    this.selectedIcon = selected;
  }

  tasks = [
    {
      id: 1,
      name: 'Junta sprint - Grupo Chasis',
      status: 'Completado',
      startDate: '16 de marzo',
      dueDate: '16 de marzo',
      asigneeId: 'Alfonso Hernandez'
    },
    {
      id: 2,
      name: 'Revisión de planos',
      status: 'En revisión',
      startDate: '12 de marzo',
      dueDate: '14 de marzo',
      asigneeId: 'Mario Bros'
    },
    {
      id: 3,
      name: 'Junta sprint - Grupo Suspensión',
      status: 'No iniciado',
      startDate: '19 de marzo',
      dueDate: '21 de marzo',
      asigneeId: 'Max Verstappen'
    },
    {
      id: 4,
      name: 'Junta sprint - Grupo Motor',
      status: 'En proceso',
      startDate: '22 de marzo',
      dueDate: '24 de marzo',
      asigneeId: 'Lewis Hamilton'
    }
  ];
}
