import { Component, DoCheck, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../api.service";
import { StoreService } from "../../../store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

interface DataSourceBody {
  name: string;
  mqtt_topic: string;
  project: string;
}

@Component({
  selector: "app-data-sources-main-page",
  template: `
    <div class="pl-20 pr-10 pt-6 w-screen flex flex-col items-center">
      <a
        [routerLink]="backButtonLink"
        class="self-start flex flex-row items-center gap-3 text-devotionPrimary text-lg font-semibold"
      >
        <app-left-chevron-icon />
        Volver
      </a>
      <div class="sm:w-5/6 lg:w-2/3 ">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-semibold text-gray-800">Fuentes de datos</h1>

          <div
            class="grid place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow place-self-center size-16 hover:cursor-pointer"
            (click)="startChange()"
          >
            <app-plus-icon
              fill="#2A4365"
              [width]="'20'"
              [height]="'20'"
            ></app-plus-icon>
          </div>
        </div>
        @for (dataSource of dataSources; track $index) {
        <div
          class="flex flex-row w-full gap-16 items-center my-4 shadow-md px-8 py-4 rounded-md"
        >
          <div class="flex-grow">
            <h1 class="text-xl font-semibold text-gray-800">
              {{ dataSource.name }}
            </h1>
            <p class="text-base text-gray-600 break-all">
              Tópico de MQTT:
              <span class="text-blue-600">{{ dataSource.mqttTopic }}</span>
            </p>
          </div>
          <button class="mr-6" (click)="startChange(dataSource.id)">
            <app-projects-icon fill="#000000" width="60" height="60" />
          </button>
        </div>
        }
      </div>

      <dialog id="modal" class="modal">
        <div class="modal-box w-11/12 h-fit max-w-5xl flex flex-col">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            >
              ✕
            </button>
          </form>
          <h3 class="font-bold text-3xl w-full border-b-4 border-gray-300 pb-3">
            {{ mode === "create" ? "Agregar nueva fuente" : "Editar fuente " }}
          </h3>

          <div
            class="rounded-md border-2 flex flex-col justify-between mt-5 flex-grow"
          >
            <form [formGroup]="dataSourceForm" class="p-4">
              <label for="dataSource-name">Nombre: </label>
              <input
                id="dataSource-name"
                type="text"
                formControlName="name"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full"
              />

              <label for="dataSource-mqttTopic">Tópico de MQTT: </label>
              <input
                id="dataSource-mqttTopic"
                type="text"
                formControlName="mqttTopic"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full"
              />
            </form>

            <div class="flex gap-4 mx-auto">
              @if (isChanging) { @if (mode === "edit") {
              <button class="btn btn-error text-white" disabled>
                Eliminar
              </button>
              }
              <button
                class="btn btn-primary bg-accent hover:bg-accentSecondary mb-8"
                disabled
              >
                <svg class="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2zm2 0a6 6 0 016-6V4a8 8 0 00-8 8h2zm2 0a4 4 0 014-4V4a6 6 0 00-6 6h2zm2 0a2 2 0 012-2V4a4 4 0 00-4 4h2z"
                  />
                </svg>
                Procesando
              </button>
              } @else { @if (mode === "edit") {
              <button
                class="btn w-24 btn-error text-white"
                (click)="deleteDataSource()"
              >
                Eliminar
              </button>
              }
              <button
                class="btn w-24 bg-devotionPrimary text-white hover:bg-sky-800  mb-8"
                (click)="onSubmit()"
              >
                {{ mode === "create" ? "Crear" : "Editar" }}
              </button>
              }
            </div>
          </div>
        </div>
      </dialog>
    </div>
  `,
})
export class DataSourcesMainPageComponent implements OnInit, DoCheck {
  constructor(
    private store: StoreService,
    private router: Router,
    private formBuilder: FormBuilder,
    protected api: ApiService,
    private route: ActivatedRoute
  ) {}

  dataSources: DataSource[] = [];
  mode: "create" | "edit" = "create";
  isChanging = false;
  modal: HTMLDialogElement | null = null;
  projectId?: string;
  backButtonLink = "/home";

  dataSourceForm = this.formBuilder.group({
    id: [""],
    name: ["", Validators.required],
    mqttTopic: ["", Validators.required],
  });

  fetchApi = (onResponse?: () => void) => {
    this.api.get(`data_sources/${this.projectId}`).subscribe((response) => {
      this.dataSources = response;

      if (onResponse) {
        onResponse();
      }
    });
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params["id"];
    });

    if (!this.projectId) {
      this.router.navigateByUrl("/home");
      return;
    }

    this.backButtonLink = `/dashboard/${this.projectId}`;
    if (this.store.dataSources === undefined) {
      this.fetchApi();
    } else {
      this.dataSources = this.store.dataSources;
    }
  }

  ngDoCheck(): void {
    this.modal = document.getElementById("modal") as HTMLDialogElement;
  }

  createDataSource = (body: any) => this.api.post("data_sources/", body);

  editDataSource = (body: any) =>
    this.api.put(`data_sources/${this.dataSourceForm.value.id}`, body);

  async onSubmit() {
    if (this.dataSourceForm.invalid) {
      return;
    }

    this.isChanging = true;

    const body = {
      name: this.dataSourceForm.value.name,
      mqtt_topic: this.dataSourceForm.value.mqttTopic,
      project: this.projectId,
    };

    console.log(body);

    const obs =
      this.mode === "create"
        ? this.createDataSource(body)
        : this.editDataSource(body);

    obs.subscribe(() => {
      this.fetchApi(() => {
        this.isChanging = false;
        this.modal?.close();
      });
    });
  }

  startChange(id?: string) {
    if (id) {
      const dataSource = this.dataSources.find(
        (dataSource) => dataSource.id === id
      );

      if (!dataSource) {
        return;
      }

      this.dataSourceForm.patchValue(dataSource);
      this.mode = "edit";
    } else {
      this.mode = "create";
      this.dataSourceForm.reset();
    }

    this.modal?.showModal();
  }

  deleteDataSource() {
    if (this.dataSourceForm.value.id) {
      this.isChanging = true;

      this.api
        .delete(`data_sources/${this.dataSourceForm.value.id}`)
        .subscribe(() => {
          this.fetchApi(() => {
            this.isChanging = false;
            this.modal?.close();
          });
        });
    }
  }
}
