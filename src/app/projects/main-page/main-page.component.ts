import { Component } from "@angular/core";
import { Router } from "@angular/router";

interface Project {
  name: string;
  description: string;
}

@Component({
  selector: "app-main-page",
  template: `
    <div class="overflow-x-auto">
      <div class="bg-white p-6 rounded-lg">
        <div class="flex items-center justify-between">
          <h1 class="text-4xl font-bold sm:mb-4 sm:mt-20 sm:ml-20">
            {{ project.name }}
          </h1>
          <div class="flex items-center space-x-2">
            <a href="/dashboard" class="flex flex-row items-center">
              <img
                src="../assets/coconut.webp"
                alt="Coconut"
                class="h-6 w-6 rounded-full ml-20 mr-2"
              />
              <span
                class="font-bold hover:underline sm:mt-40 sm:ml-20 text-base text-[#5CCEFF]"
                >Ir a dashboard</span
              >
            </a>
            <span
              class="text-lg ml-2 cursor-pointer badge badge-outline text-[#5CCEFF]"
              >•••</span
            >
          </div>
        </div>
        <p
          class="font-robotoText text-lg mb-4 sm:ml-20 max-w-3xl text-[#5E6377]"
        >
          {{ project.description }}
        </p>
        <div class="flex items-center justify-between">
          <h3 class="font-bold mb-4 sm:mt-20 sm:ml-20">Tareas</h3>
          <div class="flex flex-row flex-wrap items-center space-x-2">
            <a data-view="table" (click)="onTabClick($event)">
              <img
                src="../assets/coconut.webp"
                alt="Coconut"
                class="dashboardIcon mr-2"
              />
              <span>Tabla</span>
            </a>
            <a data-view="kanban" (click)="onTabClick($event)">
              <img
                src="../assets/coconut.webp"
                alt="Coconut"
                class="dashboardIcon mr-2"
              />
              <span>Kanban</span>
            </a>
            <a data-view="calendar" (click)="onTabClick($event)">
              <img
                src="../assets/coconut.webp"
                alt="Coconut"
                class="dashboardIcon mr-2"
              />
              <span>Calendario</span>
            </a>
            <a data-view="roadmap" (click)="onTabClick($event)">
              <img
                src="../assets/coconut.webp"
                alt="Coconut"
                class="dashboardIcon mr-2"
              />
              <span>Roadmap</span>
            </a>
          </div>
        </div>
      </div>
      <app-table></app-table>
    </div>
  `,
})
export class MainPageComponent {
  project: Project = {
    name: "",
    description: "",
  };

  constructor() {
    // Replace this with your actual JSON data source
    this.project = {
      name: "FSAE 2024",
      description:
        "Ser la mejor escudería en al competencia SAE Formula Student con un vehículo monoplaza reconocido por\n          nuestra excelencia en el diseño y construcción. Aspiramos a inspirar a las generaciones futuras\n          demostrando que con pasión, determinación y trabajo en equipo podemos alcanzar nuestros objetivos en el\n          mundo del automovilismo",
    };
  }

  currentView: string = "table"; // Default view

  onTabClick(event: Event) {
    const target = event.target as HTMLElement;
    this.currentView = target.getAttribute("data-view") || "";
  }
}
