import { WidgetDisplayType } from "./../widget-display-type";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../../../api.service";
import { Observable } from "rxjs";
import { StoreService } from "../../../store.service";

interface DataSource {
  id: string;
  name: string;
}

@Component({
  selector: "app-create-widget",
  template: `
    <dialog id="modal" class="modal">
      <div class="modal-box w-11/12 h-[80vh] max-w-5xl flex flex-col">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            [disabled]="isMutating"
          >
            ✕
          </button>
        </form>
        <h3 class="font-bold text-3xl w-full border-b-4 border-gray-300 pb-3">
          Agregar nuevo widget
        </h3>

        <div class="grid grid-cols-4 gap-4 py-5 flex-grow">
          <div
            class="col-span-1 rounded-md border-2 flex flex-col justify-between"
          >
            <form [formGroup]="widgetForm" class="p-4">
              <label for="widget-name">Nombre: </label>
              <input
                id="widget-name"
                type="text"
                formControlName="name"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full"
              />

              <label for="widget-display-type">Tipo de widget: </label>
              <select
                id="widget-display-type"
                formControlName="displayType"
                class="border-2 rounded-md px-2 py-1 my-1 w-full bg-white"
              >
                @for (option of displayTypeOptions; track $index) {
                <option class="text-sm bg-slate-50" [value]="$index">
                  {{ option }}
                </option>
                }
              </select>

              <label for="widget-data-source">Fuente de datos: </label>
              <select
                id="widget-data-source"
                formControlName="dataSource"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full bg-white"
              >
                @for (dataSource of dataSources; track $index) {
                <option class="text-sm bg-slate-50" [value]="dataSource.id">
                  {{ dataSource.name }}
                </option>
                }
              </select>

              <label for="widget-unit">Unidad: </label>
              <input
                id="widget-unit"
                type="text"
                formControlName="unit"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full"
              />
            </form>

            <div class="grid grid-rows-2 mb-4">
              <button
                class="btn w-32 btn-error text-white mx-auto"
                [ngClass]="{ invisible: mode === 'create' }"
                [disabled]="isMutating"
                (click)="deleteDataSource()"
              >
                Eliminar
              </button>
              @if (isMutating) {
              <button
                class="btn btn-primary bg-accent hover:bg-accentSecondary mx-auto mb-4"
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
              } @else {
              <button
                class="btn bg-devotionPrimary text-white hover:bg-sky-800 mx-auto mb-4 w-32"
                (click)="onSubmit()"
              >
                {{mode === "create" ? "Crear" : "Editar" + " widget"}}
              </button>
              }
            </div>
          </div>
          <div
            class="col-span-3 rounded-md border-2 p-4 items-center flex flex-col"
          >
            <h4 class="text-3xl font-black place-self-start truncate">
              {{ widgetForm.value.name ? widgetForm.value.name : "Sin título" }}
            </h4>

            <div class="flex place-items-center flex-grow">
              @if (widgetForm.value.displayType === widgetDisplayType.Number) {
              <p class="text-9xl">10 °C</p>
              } @else {
              <app-projects-icon
                fill="#5CCEFF"
                width="300"
                height="300"
                class="my-8"
              />
              }
            </div>
            <!-- <app-graph> </app-graph> -->
          </div>
        </div>
      </div>
    </dialog>
  `,
})
export class CreateWidgetComponent implements OnInit {
  @Input() modal: HTMLDialogElement | null = null;
  @Input() position = 0;
  @Input() projectId = "";
  @Input() dataSources: DataSource[] = [];
  @Input() fetchApi: (fn: () => void) => void = () => {};
  @Input() startChange$!: Observable<void>;

  widgetDisplayType = WidgetDisplayType;
  mode = "edit";

  displayTypeOptions = Object.keys(this.widgetDisplayType)
    .filter((option) => isNaN(Number(option)))
    .map((option) => option.split("_").join(" "));

  isMutating = false;

  constructor(
    private formBuilder: FormBuilder,
    protected api: ApiService,
    private store: StoreService
  ) {}

  widgetForm = this.formBuilder.group({
    id: [""],
    name: ["", Validators.required],
    displayType: [this.widgetDisplayType.Number, Validators.required],
    dataSource: ["", Validators.required],
    unit: ["", Validators.required],
  });

  ngOnInit(): void {
    this.widgetForm.controls.displayType.valueChanges.subscribe((value) => {
      if (typeof value === "string") {
        this.widgetForm.patchValue({ displayType: Number(value) });
      }
    });

    this.startChange$.subscribe(() => {
      if (this.store.widget) {
        this.widgetForm.patchValue({
          ...this.store.widget,
          dataSource: this.store.widget.dataSource.id,
        });

        console.log(this.widgetForm.value);
        this.mode = "edit";
      } else {
        this.widgetForm.reset();
        this.mode = "create";
      }
      this.modal?.showModal();
    });
  }

  onSubmit() {
    console.log(this.widgetForm.value);

    if (
      this.widgetForm.invalid ||
      (this.mode === "edit" && !this.widgetForm.value.id)
    ) {
      console.log("Invalid form");
      return;
    }

    this.isMutating = true;

    const widgetBody = {
      ...this.widgetForm.value,
      display_type: this.widgetForm.value.displayType,
      data_source: this.widgetForm.value.dataSource,
      position: this.position,
      project: this.projectId,
    };

    let response: Observable<any> | undefined;
    if (this.mode === "edit") {
      response = this.api.put(
        `widgets/${this.widgetForm.value.id}/`,
        widgetBody
      );
    } else {
      response = this.api.post("widgets/", widgetBody);
    }

    response.subscribe((response) => {
      console.log(response);
      this.fetchApi(() => {
        this.isMutating = false;
        this.modal?.close();
      });
    });
  }

  deleteDataSource() {
    console.log("Delete data source");
    this.isMutating = true;

    this.api.delete(`widgets/${this.widgetForm.value.id}/`).subscribe(() => {
      this.fetchApi(() => {
        this.isMutating = false;
        this.modal?.close();
      });
    });
  }
}
