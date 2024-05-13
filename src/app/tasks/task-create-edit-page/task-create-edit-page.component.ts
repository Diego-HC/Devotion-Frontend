import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";

@Component({
  selector: 'app-task-create-edit-page',
  template: `
    <app-loading *ngIf="showLoading" [message]="loadingMessage" />
    <div class="overflow-x-auto mx-32" *ngIf="!showLoading && (store.membersPool.length > 0)">
      <div class="bg-white py-8 rounded-lg">
        <h2 class="font-roboto font-bold md:m-0.5">
          {{ store.task.id ? 'Editar Tarea' : 'Nueva Tarea' }}
        </h2>
        <div class="flex flex-row items-center mt-2 gap-4">
          <input type="text"
                 class="input-md input-bordered input-['#5CCEFF'] md:w-5/12 md:m-0.5 text-3xl font-helvetica rounded-box font-bold shadow-md"
                 [(ngModel)]="store.task.name" (ngModelChange)="store.task.name = $event"/>
          <div class="flex flex-col items-center">
            <button (click)="onSubmit()" class="btn-circle items-center justify-center"
                    style="background-color: #2A4365">+
            </button>
            <p class="text-xs font-robotoCondensed">Publicar</p>
          </div>
        </div>
        <div class="flex flex-row items-center mt-2 gap-8">
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Fecha Inicio</h2>
            <input type="date" class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"
                   [(ngModel)]="store.task.startDate" (ngModelChange)="store.task.startDate = $event"/>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Fecha Fin</h2>
            <input type="date" class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"
                   [(ngModel)]="store.task.dueDate" (ngModelChange)="store.task.dueDate = $event"/>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Prioridad</h2>
            <div class="dropdown dropdown-right">
              <div tabindex="0" role="button" class="btn m-1">{{ selectedPriority }}</div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a (click)="updatePriority('Baja')">Baja</a></li>
                <li><a (click)="updatePriority('Media')">Media</a></li>
                <li><a (click)="updatePriority('Alta')">Alta</a></li>
              </ul>
            </div>
          </div>
        </div>
        <h2 class="font-roboto font-bold mt-4 md:m-0.5">Descripción</h2>
        <textarea class="textarea-md text-['#5CCEFF'] textarea-bordered w-1/2 h-40 md:m-0.5 rounded-box shadow-md"
                  [(ngModel)]="store.task.description"
                  (ngModelChange)="store.task.description = $event">
        </textarea>
        <div class="w-1/2 md:m-1">
          <h2 class="font-roboto font-bold mt-4 md:m-0.5">Asignado</h2>
          <app-search-select selecting="assignee" />
        </div>
        <hr class="w-1/2 md:m-1">
        <button
          *ngIf="store.task.id"
          (click)="store.showConfirmDeletion = true"
          class="text-cardRed border border-cardRed bg-white text-sm font-roboto font-bold py-2 px-4 rounded-lg mt-4"
        >
          Eliminar Tarea
        </button>
        <app-confirm-deletion
          *ngIf="store.showConfirmDeletion"
          [deletingTask]="true"
        />
        <app-alert *ngIf="showWarning" [message]="warningMessage"/>
      </div>
      <br/><br/><br/><br/><br/><br/><br/>ㅤ
    </div>
  `
})
export class TaskCreateEditPageComponent implements OnInit {
  constructor(private api: ApiService, private router: Router, protected store: StoreService) { }

  showWarning = false;
  warningMessage = '';
  showLoading = false;
  loadingMessage = '';
  selectedPriority = 'Baja';

  ngOnInit() {
    if (this.store.pageWasReloaded) {
      void this.router.navigateByUrl("/home");
      return;
    }
    if (this.store.membersPool.length == 0) {
      this.api.get(
        `projects/${this.store.task.parentProject}/members/`
      ).subscribe((members) => {
        this.store.membersPool = members;
      });
    }
  }

  onSubmit() {
    const onResponse = (response: Task) => {
      void this.router.navigateByUrl(`/task/${response.id}`);
    };

    if (!this.store.task.id) {
      this.loadingMessage = "Creando tarea...";
      this.showLoading = true;

      this.api.post('tasks/', this.store.taskPostBody()).subscribe(onResponse,(error) => {
        this.warningMessage = "Error al crear la tarea. Por favor, inténtelo de nuevo. \n Procura que todos los campos estén completos.";
        this.showWarning = true;
        this.showLoading = false;
      });
    } else {
      this.loadingMessage = "Actualizando datos...";
      this.showLoading = true;

      this.api.put(`tasks/${this.store.task.id}/`, this.store.taskPostBody()).subscribe(onResponse,(error) => {
        this.warningMessage = "Error al actualizar la tarea. Por favor, inténtelo de nuevo. \n Procura que todos los campos estén completos.";
        this.showWarning = true;
        this.showLoading = false;
      });
    }
  }

  updatePriority(priority: string) {
    this.selectedPriority = priority;
    switch (this.selectedPriority) {
      case 'Baja':
        this.store.task.priority = 0;
        break;
      case 'Media':
        this.store.task.priority = 1;
        break;
      case 'Alta':
        this.store.task.priority = 2;
        break;
      default:
        this.store.task.priority = 0;
    }
  }
}
