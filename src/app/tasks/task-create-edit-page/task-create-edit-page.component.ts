import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../api.service";
import {StoreService} from "../../store.service";

@Component({
  selector: 'app-task-create-edit-page',
  template: `
    <app-loading *ngIf="showLoading" [message]="loadingMessage"/>
    <div class="overflow-x-auto mx-32" *ngIf="!showLoading && (store.membersPool.length > 0)">
      <div class="bg-white py-8 rounded-lg">
        <h2 class="font-roboto font-bold md:m-0.5">
          {{ store.task.id ? 'Editar Tarea *' : 'Nueva Tarea *' }}
        </h2>
        <form [formGroup]="taskForm" class="overflow-x-auto md:mr-96 mt-4">
          <div class="flex flex-row items-center mt-2 gap-4">
            <input type="text"
                   formControlName="name"
                   required
                   class="input-md input-bordered input-['#5CCEFF'] md:w-5/12 md:m-0.5 text-3xl font-helvetica rounded-box font-bold shadow-md"
            />
            <div class="flex flex-col items-center">
              <button (click)="onSubmit()" class="btn-circle items-center justify-center"
                      style="background-color: #2A4365">+
              </button>
              <p class="text-xs font-robotoCondensed">Publicar</p>
            </div>
          </div>
          <div class="text-red-500"
               *ngIf="taskForm.get('name')?.errors?.['required'] && taskForm.get('name')?.touched">
            * El nombre de la tarea es obligatorio.
          </div>
          <div class="flex flex-row items-center mt-2 gap-8">
            <div class="flex flex-col items-center">
              <h2 class="font-roboto font-bold">Fecha Inicio</h2>
              <input type="date"
                     formControlName="start_date"
                     class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"
              />
            </div>
            <div class="flex flex-col items-center">
              <h2 class="font-roboto font-bold">Fecha Fin *</h2>
              <input type="date"
                     formControlName="due_date"
                     required
                     class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"
              />
            </div>
            <div class="flex flex-col items-center">
              <h2 class="font-roboto font-bold">Prioridad *</h2>
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
          <div class="flex gap-4">
            <div class="text-red-500"
                 *ngIf="taskForm.get('start_date')?.errors?.['required'] && taskForm.get('start_date')?.touched">
              * La fecha de inicio es obligatoria.
            </div>
            <div class="text-red-500"
                 *ngIf="taskForm.get('due_date')?.errors?.['required'] && taskForm.get('due_date')?.touched">
              * La fecha de fin es obligatoria.
            </div>
          </div>
          <h2 class="font-roboto font-bold mt-4 md:m-0.5">Descripción</h2>
          <textarea
            formControlName="description"
            class="textarea-md text-['#5CCEFF'] textarea-bordered w-1/2 h-40 md:m-0.5 rounded-box shadow-md"
          >
        </textarea>
          <div class="text-red-500"
               *ngIf="taskForm.get('description')?.errors?.['required'] && taskForm.get('description')?.touched">
            * La descripción es obligatoria.
          </div>
        </form>
        <div class="w-1/2 md:m-1">
          <h2 class="font-roboto font-bold mt-4 md:m-0.5">Asignado *</h2>
          <app-search-select selecting="assignee"/>
        </div>
        <div class="text-red-500"
             *ngIf="taskForm.get('assignee')?.errors?.['required'] && taskForm.get('assignee')?.touched">
          * La tarea debe tener un asignado.
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
        <div class="md:mt-3"></div>
        <app-alert *ngIf="showWarning" [message]="warningMessage"/>
      </div>
      <br/><br/><br/><br/><br/><br/><br/>ㅤ
    </div>
  `
})
export class TaskCreateEditPageComponent implements OnInit {
  constructor(private api: ApiService, private router: Router, protected store: StoreService, private formBuilder: FormBuilder) {
  }

  showWarning = false;
  warningMessage = '';
  showLoading = false;
  loadingMessage = '';
  selectedPriority = 'Baja';
  today = new Date();

  taskForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: [0],
    start_date: [this.today.toISOString().split('T')[0], Validators.required],
    due_date: ['', Validators.required],
    assignee: ['', Validators.required]
  });

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

    // If editing existing task, populate form with existing task data
    if (this.store.task.id) {
      this.taskForm.patchValue({
        name: this.store.task.name,
        description: this.store.task.description,
        priority: this.store.task.priority,
        start_date: this.store.task.startDate,
        due_date: this.store.task.dueDate,
        assignee: this.store.task.assignee
      });
    }

  }

  onSubmit() {

    this.taskForm.patchValue({
      assignee: this.store.task.assignee
    });

    this.store.task.name = this.taskForm.value.name;
    this.store.task.description = this.taskForm.value.description;
    this.store.task.priority = this.taskForm.value.priority;
    this.store.task.startDate = this.taskForm.value.start_date;
    this.store.task.dueDate = this.taskForm.value.due_date;



    Object.values(this.taskForm.controls).forEach(control => {
      control.markAsTouched();
    });

    if (this.taskForm.invalid) {
      return;
    }
    const onResponse = (response: Task) => {
      void this.router.navigateByUrl(`/task/${response.id}`);
    };

    // Error handling function
    const onError = (errorResponse: any) => {
      if (errorResponse.error && errorResponse.error.message) {
        this.warningMessage = errorResponse.error.message;
      } else {
        this.warningMessage = "Error al realizar la solicitud. Por favor, inténtelo de nuevo.";
      }
      this.showWarning = true;
      this.showLoading = false;
    };

    if (!this.store.task.id) {
      this.loadingMessage = "Creando tarea...";
      this.showLoading = true;

      this.api.post('tasks/', this.store.taskPostBody()).subscribe(onResponse, onError);
    } else {
      this.loadingMessage = "Actualizando datos...";
      this.showLoading = true;

      this.api.put(`tasks/${this.store.task.id}/`, this.store.taskPostBody()).subscribe(onResponse, onError);
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
