import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";

@Component({
  selector: "app-create-edit-page",
  template: `
    <app-loading *ngIf="showLoading" [message]="loadingMessage" />
    <div class="px-16" *ngIf="!showLoading && (store.membersPool.length > 0)">
      <div class="flex justify-center items-center">
        <div class="px-12 lg:w-1/2 py-10">
          <h1 class=" text-l font-roboto font-extrabold">{{ store.project.id ? 'Editar Proyecto' : 'Nuevo Proyecto *' }}</h1>
          <div class="flex flex-row flex-grow items-center justify-center">
            <input
              type="text"
              class="input input-bordered flex-grow mr-4 shadow-md font-helvetica font-bold text-3xl"
              [(ngModel)]="store.project.name"
              #name="ngModel"
              name="name"
              required
            />
            <div class="flex flex-col items-center">
              <button
                (click)="onSubmit()"
                class="bg-devotionPrimary btn-circle items-center justify-center mt-4 text-white font-bold font-helvetica text-3xl w-12 h-12"
              >
                +
              </button>
              <p class="text-xs font-robotoCondensed">Publicar</p>
            </div>
          </div>
          <div
            *ngIf="name.invalid && name.touched"
            class="text-red-500 text-xs -mt-3"
          >
            * El nombre del proyecto es obligatorio.
          </div>

          <div class="flex flex-col flex-grow justify-center">
            <h1 class=" text-l font-roboto font-extrabold mb-3">
              Descripción *
            </h1>
            <textarea
              rows="4"
              class="textarea textarea-bordered mr-4 shadow-md font-robotoCondensed text-s w-full min-h-10"
              [(ngModel)]="store.project.description"
              #desc="ngModel"
              desc="desc"
              required
            ></textarea>
          </div>
          <div
            *ngIf="desc.invalid && desc.touched"
            class="text-red-500 text-xs mt-1"
          >
            * La descripción del proyecto es obligatoria.
          </div>
          <h1 class=" text-l font-roboto font-extrabold mb-3 mt-3">
            Líderes
          </h1>
          <app-search-select
            selecting="leaders"
          />
          <p class="text-xs font-robotoCondensed text-[#5E6377] -mt-3">
            La persona líder será quien valide las tareas de este subproyecto.
            También podrá validar tareas de todos los subproyectos
            descendientes.
          </p>
          <h1 class=" text-l font-roboto font-extrabold mb-3 mt-3">Miembros</h1>
          <app-search-select
            selecting="members"
          />
          <app-alert
            *ngIf="showWarning"
            [message]="warningMessage"
          />
        </div>
      </div>
    </div>
  `,
})
export class CreateEditPageComponent implements OnInit {
  constructor(private api: ApiService, protected store: StoreService, private router: Router) {}

  showWarning = false;
  warningMessage = "";
  showLoading = false;
  loadingMessage = "";

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
  }

  onSubmit() {
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

      this.api.post("projects/", this.store.projectPostBody()).subscribe(onResponse, (_) => {
        this.warningMessage =
          "Error al crear el proyecto. Por favor, inténtelo de nuevo.";
        this.showWarning = true;
        this.showLoading = false;
      });

    // Editar proyecto
    } else {
      this.loadingMessage = "Actualizando datos...";
      this.showLoading = true;

      this.api.put(`projects/${this.store.project.id}/`, this.store.projectPostBody()).subscribe(onResponse, (_) => {
        this.warningMessage =
          "Error al editar el proyecto. Por favor, inténtelo de nuevo.";
        this.showWarning = true;
        this.showLoading = false;
      });
    }
  }
}
