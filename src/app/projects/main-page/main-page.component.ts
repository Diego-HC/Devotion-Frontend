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
            <h1 class="text-4xl font-bold sm:mb-4 sm:mt-20 sm:ml-20">{{ project.name}}</h1>
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
          <div class="flex flex-row flex-wrap items-center space-x-2">
            <a data-view="table" (click)="onTabClick($event)">
              <img src="../assets/coconut.webp" alt="Coconut" class="dashboardIcon mr-2">
              <span>Tabla</span>
            </a>
            <a data-view="kanban" (click)="onTabClick($event)">
              <img src="../assets/coconut.webp" alt="Coconut" class="dashboardIcon mr-2">
              <span>Kanban</span>
            </a>
            <a data-view="calendar" (click)="onTabClick($event)">
              <img src="../assets/coconut.webp" alt="Coconut" class="dashboardIcon mr-2">
              <span>Calendario</span>
            </a>
            <a data-view="roadmap" (click)="onTabClick($event)">
              <img src="../assets/coconut.webp" alt="Coconut" class="dashboardIcon mr-2">
              <span>Roadmap</span>
            </a>
          </div>
        </div>
      </div>
<!--      <div class="container">-->
        <app-table></app-table>
<!--      </div>-->
    </div>
  `,
  styles: [`
    @screen sm {
      /*.bigTitle {*/
      /*  @apply text-4xl font-bold sm:mb-4 sm:mt-20 sm:ml-20;*/
      /*  color: black;*/
      /*}*/

      .subtitle {
        @apply font-bold mb-4 sm:mt-20 sm:ml-20;
        color: black;
      }

      .description {
        @apply font-robotoText text-lg text-gray-700 mb-4 sm:ml-20;
        @apply max-w-3xl;
        color: #5E6377;
      }

      .goToDashboard {
        @apply font-bold text-blue-500 hover:underline sm:mt-40 sm:ml-20 text-base;
        color: #5CCEFF
      }

      .dashboardIcon {
        @apply h-6 w-6 mr-1 rounded-full ml-20;
      }

      .configBadge {
        @apply text-lg ml-2 cursor-pointer;
        @apply badge badge-outline;
        color: #5CCEFF;
      }

      .container {
        @apply w-full;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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

  onTabClick(event: Event) {
    const target = event.target as HTMLElement;
    this.currentView = target.getAttribute('data-view') || '';
  }
}
