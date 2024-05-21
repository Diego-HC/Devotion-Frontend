import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';
@Component({
  selector: "app-create-edit-page",
  template: `
    <app-loading *ngIf="showLoading" [message]="loadingMessage"/>
    <div class="px-16" *ngIf="!showLoading && (store.membersPool.length > 0)">
      <a
        (click)="backPage()"
        class="flex flex-row items-center gap-3 text-devotionPrimary text-lg font-semibold">
        <app-left-chevron-icon/>
        Volver
      </a>
      <div class="flex justify-center items-center">
        <div class="px-12 lg:w-1/2 py-10">
          <h1
            class=" text-l font-roboto font-extrabold">{{ store.project.id ? 'Editar Proyecto' : 'Nuevo Proyecto *' }}</h1>
          <form [formGroup]="projectForm">
            <div class="flex flex-row flex-grow items-center justify-center">
              <input
                type="text"
                formControlName="name"
                required
                class="input input-bordered flex-grow mr-4 shadow-md font-helvetica font-bold text-3xl"
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
            <div class="text-red-500 md:mb-1"
                 *ngIf="projectForm.get('name')?.errors?.['required'] && projectForm.get('name')?.touched">
              * El nombre del proyecto es obligatorio.
            </div>
            <div class="flex flex-col flex-grow justify-center">
              <h1 class=" text-l font-roboto font-extrabold mb-3">
                Descripción *
              </h1>
              <textarea
                rows="4"
                formControlName="description"
                required
                class="textarea textarea-bordered mr-4 shadow-md font-robotoCondensed text-s w-full min-h-10"
              ></textarea>
            </div>
            <div class="text-red-500 md:mt-1"
                 *ngIf="projectForm.get('description')?.errors?.['required'] && projectForm.get('description')?.touched">
              * La descripción del proyecto es obligatoria.
            </div>
            <h1 class="text-l font-roboto font-extrabold mb-3 mt-3">
              Líderes *
            </h1>
            <app-search-select
              selecting="leaders"
            />
            <p class="text-xs font-robotoCondensed text-[#5E6377] -mt-3">
              La persona líder será quien valide las tareas de este subproyecto.
              También podrá validar tareas de todos los subproyectos
              descendientes.
            </p>
            <div class="text-red-500 md:mt-1"
                 *ngIf="projectForm.get('leaders')?.errors?.['required'] && projectForm.get('leaders')?.touched">
              * Agregar líderes es necesario para la creación del proyecto.
            </div>
            <h1 class=" text-l font-roboto font-extrabold mb-3 mt-3">
              Miembros
            </h1>
            <app-search-select
              selecting="members"
            />
          </form>
          <hr>
          <button
            *ngIf="store.project.id"
            (click)="store.showConfirmDeletion = true"
            class="text-cardRed border border-cardRed bg-white text-sm font-roboto font-bold py-2 px-4 rounded-lg mt-4"
          >
            Eliminar Proyecto
          </button>
          <app-confirm-deletion
            *ngIf="store.showConfirmDeletion"
          />
          <app-confirm-go-back
            *ngIf="store.showConfirmGoBack"
            [backButtonLink]="backButtonLink"
          />
          <div class="md:mt-3"></div>
          <app-alert
            *ngIf="showWarning"
            [message]="warningMessage"
          />
        </div>
      </div>
    </div>
  `,
})
export class CreateEditPageComponent implements OnInit, OnDestroy {
  constructor(private api: ApiService, protected store: StoreService, private router: Router, private formBuilder: FormBuilder) {}

  showWarning = false;
  warningMessage = "";
  showLoading = false;
  loadingMessage = "";
  backButtonLink = "/home";
  showBackWarning = false;
  initialFormValue : any;

  private formChangesSubscription: Subscription | undefined;

  projectForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    leaders: ['', Validators.required],
    members: [''],
  });

  ngOnInit() {
    if (this.store.pageWasReloaded) {
      void this.router.navigateByUrl("/home");
      return;
    }
    if (this.store.membersPool.length == 0) {
      this.api.get("users/").subscribe((users) => {
        this.store.membersPool = users;
      });
    }
    if (this.store.project.parent) {
      this.backButtonLink = `/project/${this.store.project.parent}`;
    } else if (this.store.project.id) {
      this.backButtonLink = `/project/${this.store.project.id}`;
    }

    // If editing existing project, populate form with existing project data
    if(this.store.project.id) {
      this.projectForm.patchValue({
        name: this.store.project.name,
        description: this.store.project.description,
        leaders: this.store.project.leaders,
        members: this.store.project.members,
      });
      this.backButtonLink = `/project/${this.store.project.id}`;
    }

    // Store initial form value when the form is initialized
    this.initialFormValue = { ...this.projectForm.value };
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
    const formHasChanged = !this.isEqual(this.projectForm.value, this.initialFormValue);

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

    this.projectForm.patchValue({
      leaders: this.store.project.leaders,
      members: this.store.project.members,
    });

    this.store.project.name = this.projectForm.value.name;
    this.store.project.description = this.projectForm.value.description;

    Object.values(this.projectForm.controls).forEach(control => {
      control.markAsTouched();
    });


    if (this.projectForm.invalid) {
      console.log("Invalid form.");
      return;
    }

    if (!this.store.project.name || !this.store.project.description) {
      this.showWarning = true;
      this.warningMessage = "Por favor, completa todos los campos requeridos.";
      return;
    }
    if (this.store.project.leaders.length == 0) {
      this.showWarning = true;
      this.warningMessage = "Por favor, selecciona al menos un lider.";
      return;
    }

    const onResponse = (response: Project) => {
      void this.router.navigateByUrl(`/project/${response.id}`);
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

    // Crear proyecto
    if (!this.store.project.id) {
      if (this.store.project.parent) {
        this.loadingMessage = "Creando subproyecto...";
      } else {
        this.loadingMessage = "Creando proyecto...";
        setTimeout(() => {
          this.loadingMessage = "Creando un calendario de Google para el proyecto. ¡Revisa tu correo para agregarlo a tus calendarios!";
        }, 2500);
      }
      this.showLoading = true;
      this.api.post("projects/", this.store.projectPostBody()).subscribe(onResponse, onError);

    // Editar proyecto
    } else {
      this.loadingMessage = "Actualizando datos...";
      this.showLoading = true;

      this.api.put(`projects/${this.store.project.id}/`, this.store.projectPostBody()).subscribe(onResponse, onError);
    }
  }
}
