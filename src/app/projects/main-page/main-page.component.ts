import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-main-page',
  template: `
    <div class="overflow-x-auto">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center justify-between">
            <h1 class="bigTitle">{{ project.name}}</h1>
          <div class="flex items-center space-x-2">
            <a href="/dashboard" class="flex flex-row items-center">
              <img src="../assets/coconut.webp" alt="Coconut" class="dashboardIcon mr-2">
              <span class="goToDashboard">Ir a dashboard</span>
            </a>
            <span class="configBadge">•••</span>
          </div>
        </div>
        <p class="description">
          {{ project.description }}
        </p>
        <div class="flex items-center justify-between">
          <h3 class="subtitle">Tareas</h3>
          <div class="flex flex-row items-center space-x-2">
            <button (click)="onTabClick('table')" class="configBadge">Tabla</button>
            <button (click)="onTabClick('kanban')" class="configBadge">Kanban</button>
          </div>
      </div>
      </div>
      <app-table></app-table>
    </div>
  `,
  styles: [`
    .bigTitle {
      @apply text-4xl font-bold mb-4 mt-20 ml-20;
      color: black;
    }

    .subtitle {
      @apply font-bold mb-4 mt-20 ml-20;
      color: black;
    }

    .description {
      @apply font-robotoText text-lg text-gray-700 mb-4 ml-20;
      @apply max-w-3xl;
      color: #5E6377;
    }

    .goToDashboard {
      @apply font-bold text-blue-500 hover:underline mt-40 ml-20;
      color: #5CCEFF
    }

    .dashboardIcon {
      @apply h-6 w-auto mr-2 rounded-full ml-20;
    }

    .configBadge {
      @apply text-lg ml-2 cursor-pointer;
      @apply badge badge-outline;
      color: #5CCEFF;
    }

  `]
})
export class MainPageComponent {
  project: Project = {
    name: '',
    description: ''
  };

  constructor() {
    // Replace this with your actual JSON data source
    this.project = {
      name: 'FSAE 2024',
      description: 'Ser la mejor escudería en al competencia SAE Formula Student con un vehículo monoplaza reconocido por\n          nuestra excelencia en el diseño y construcción. Aspiramos a inspirar a las generaciones futuras\n          demostrando que con pasión, determinación y trabajo en equipo podemos alcanzar nuestros objetivos en el\n          mundo del automovilismo'
    };
  }

  currentView: string = 'table'; // Default view

  onTabClick(tab: string) {
    this.currentView = tab;
  }
}
