import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../api.service";
import {StoreService} from "../../store.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-create-edit-page',
  template: `
    <app-loading *ngIf="showLoading" [message]="loadingMessage"/>
    <div class="mx-12 block lg:flex lg:flex-row" *ngIf="!showLoading && (store.userPool.length > 0)">
      <div class="min-w-[500px] max-w-[600px] ml-10 pr-4">
        <button (click)="backPage()" class="flex flex-row items-center gap-3 text-devotionPrimary text-lg font-semibold mb-6">
          <app-left-chevron-icon/>
          Volver
        </button>
        <div>
          <h2 class="font-roboto font-bold">
            {{ store.task.id ? 'Editar Tarea *' : 'Nueva Tarea *' }}
          </h2>
          <form [formGroup]="taskForm" class="mt-4">
            <div class="flex flex-row w-full items-center mt-2 gap-4">
              <input type="text"
                     formControlName="name"
                     required
                     class="input-md input-bordered input-['#5CCEFF'] w-full text-3xl font-helvetica rounded-box font-bold shadow-md"
              />
              <div class="flex flex-col items-center">
                <button
                  (click)="onSubmit()"
                  class="bg-devotionPrimary btn-circle flex items-center justify-center mt-4 w-12 h-12"
                >
                  <app-checkmark-icon/>
                </button>
                <p class="text-xs font-robotoCondensed">Publicar</p>
              </div>
            </div>
            <div class="text-red-500"
                 *ngIf="taskForm.get('name')?.errors?.['required'] && taskForm.get('name')?.touched">
              * El nombre de la tarea es obligatorio.
            </div>
            <div class="flex flex-row justify-evenly items-center mt-2 gap-8">
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
                  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                    <li>
                      <button (click)="updatePriority('Baja')">
                        <app-priority-icon
                          class="pr-6"
                          [priority]="0"
                          [animated]="false"
                        />
                      </button>
                    </li>
                    <li>
                      <button (click)="updatePriority('Media')">
                        <app-priority-icon
                          class="pr-6"
                          [priority]="1"
                          [animated]="false"
                        />
                      </button>
                    </li>
                    <li>
                      <button (click)="updatePriority('Alta')">
                        <app-priority-icon
                          class="pr-6"
                          [priority]="2"
                          [animated]="false"
                        />
                      </button>
                    </li>
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
            <h2 class="font-roboto font-bold mt-4">Descripción</h2>
            <textarea
              formControlName="description"
              class="w-full textarea-md text-['#5CCEFF'] textarea-bordered h-40 rounded-box shadow-md"
            ></textarea>
            <div class="text-red-500"
                 *ngIf="taskForm.get('description')?.errors?.['required'] && taskForm.get('description')?.touched">
              * La descripción es obligatoria.
            </div>
          </form>
          <div class="w-full md:m-1">
            <h2 class="font-roboto font-bold mt-4 md:m-0.5">Asignado *</h2>
            <app-search-select selecting="assignee"/>
          </div>
          <div class="text-red-500"
               *ngIf="taskForm.get('assignee')?.errors?.['required'] && taskForm.get('assignee')?.touched">
            * La tarea debe tener un asignado.
          </div>
          <hr class="w-full md:m-1">
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
          ></app-confirm-deletion>
          <app-confirm-go-back
            *ngIf="store.showConfirmGoBack"
            [backButtonLink]="backButtonLink"
          />
          <div class="md:mt-3"></div>
          <app-alert *ngIf="showWarning" [message]="warningMessage"/>
        </div>
      </div>
      <div class="w-full pl-10 lg:pl-4">
        <app-calendar
          [projectOrTaskId]="store.task.parentTask || store.task.parentProject"
          [isTask]="!!store.task.parentTask"
          [allowNavigation]="false"
          [forceShowSubtasks]="true"
        ></app-calendar>
      </div>
    </div>
  `
})
export class TaskCreateEditPageComponent implements OnInit, OnDestroy {
  constructor(private api: ApiService, private router: Router, protected store: StoreService, private formBuilder: FormBuilder) {
  }

  showWarning = false;
  warningMessage = '';
  showLoading = false;
  loadingMessage = '';
  selectedPriority = 'Baja';
  today = new Date();
  backButtonLink = "/home";
  showBackWarning = false;
  initialFormValue : any;

  private formChangesSubscription: Subscription | undefined;

  taskForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    priority: [0],
    start_date: [this.today.toISOString().split('T')[0], Validators.required],
    due_date: ['', Validators.required],
    assignee: ['', Validators.required]
  });

  ngOnInit() {
    // console.log(this.store.task);
    // this.store.userPool = [{
    //   id: '',
    //   name: '',
    //   email: '',
    //   isLeader: false,
    // }];
    // return;
    if (this.store.pageWasReloaded) {
      void this.router.navigateByUrl("/home");
      return;
    }
    if (this.store.userPool.length == 0) {
      this.api.get(
        `projects/${this.store.task.parentProject}/members/`
      ).subscribe((members) => {
        this.store.userPool = members;
      });
    }

    if (this.store.task.parentTask) {
      this.backButtonLink = `/task/${this.store.task.parentTask}`;
    } else if (this.store.task.parentProject) {
      this.backButtonLink = `/project/${this.store.task.parentProject}`;
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
      this.selectedPriority = ["Baja", "Media", "Alta"][this.store.task.priority];
      this.backButtonLink = `/task/${this.store.task.id}`;
    }

    // Store initial form value when the form is initialized
    this.initialFormValue = { ...this.taskForm.value };
  }

  ngOnDestroy() {
    // Unsubscribe from valueChanges to prevent memory leaks
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  isEqual(value1: any, value2: any): boolean {
    // Check if both values are objects
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      // Get the keys of both objects
      const keys1 = Object.keys(value1);
      const keys2 = Object.keys(value2);

      // Check if the number of keys is the same
      if (keys1.length !== keys2.length) {
        return false;
      }

      // Check if all keys and their values are equal
      for (const key of keys1) {
        if (!this.isEqual(value1[key], value2[key])) {
          return false;
        }
      }

      return true;
    }

    // If not objects, compare values directly
    return value1 === value2;
  }

  backPage() {
    // Check if there are any changes in the form
    const formHasChanged = !this.isEqual(this.taskForm.value, this.initialFormValue);

    if (formHasChanged) {
      // If form has changed, show warning or navigate back
      this.store.showConfirmGoBack = true;
      this.showBackWarning = true; // Or trigger navigation logic here
    } else {
      // If form has not changed, proceed with back navigation
      this.router.navigateByUrl(this.backButtonLink);
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
      } else if (errorResponse.error.non_field_errors) {
        this.warningMessage = errorResponse.error.non_field_errors[0];
      }
      else {
        this.warningMessage = "Error al realizar la solicitud. Por favor, inténtelo de nuevo.";
      }
      this.showWarning = true;
      this.showLoading = false;
    };

    if (!this.store.task.id) {
      this.loadingMessage = "Creando tarea...";
      this.showLoading = true;

      this.api.post('tasks/', this.store.taskRequestBody()).subscribe(onResponse, onError);
    } else {
      this.loadingMessage = "Actualizando datos...";
      this.showLoading = true;

      this.api.put(`tasks/${this.store.task.id}/`, this.store.taskRequestBody()).subscribe(onResponse, onError);
    }
  }

  updatePriority(priority: string) {
    this.selectedPriority = priority;
    switch (this.selectedPriority) {
      case 'Baja':
        this.taskForm.patchValue({ priority: 0 });
        break;
      case 'Media':
        this.taskForm.patchValue({ priority: 1 });
        break;
      case 'Alta':
        this.taskForm.patchValue({ priority: 2 });
        break;
      default:
        this.taskForm.patchValue({ priority: 0 });
    }
  }
}
