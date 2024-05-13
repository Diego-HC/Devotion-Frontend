import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

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
              <label for="widget-name">Widget Name: </label>
              <input
                id="widget-name"
                type="text"
                formControlName="name"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full"
              />

              <label for="widget-display-type">Display Type: </label>
              <select
                id="widget-display-type"
                formControlName="displayType"
                class="border-2 rounded-md px-2 py-1 my-1 w-full bg-white"
              >
                <option class="text-sm bg-slate-50" value="number">
                  Number
                </option>
                <option class="text-sm bg-slate-50" value="graph">
                  Line Graph
                </option>
                <option class="text-sm bg-slate-50" value="table">Table</option>
              </select>

              <label for="widget-data-source">Data Source: </label>
              <select
                id="widget-data-source"
                formControlName="dataSource"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full bg-white"
              >
                <option class="text-sm bg-slate-50" value="1">
                  Sensor Temperatura 1
                </option>
                <option class="text-sm bg-slate-50" value="2">
                  Sensor Temperatura 2
                </option>
              </select>

              <label for="widget-unit">Unit: </label>
              <input
                id="widget-unit"
                type="text"
                formControlName="unit"
                required
                class="border-2 rounded-md px-2 py-1 my-1 w-full"
              />
            </form>

            <button
              class="btn bg-devotionPrimary text-white hover:bg-sky-800 mx-auto mb-8"
              (click)="onSubmit()"
            >
              Close
            </button>
          </div>
          <div
            class="col-span-3 rounded-md border-2 p-4 items-center flex flex-col"
          >
            <h4 class="text-3xl font-black place-self-start">
              {{ widgetForm.value.name ? widgetForm.value.name : "Sin título" }}
            </h4>

            <div class="flex place-items-center flex-grow">
              @if (widgetForm.value.displayType === "number") {
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
export class CreateWidgetComponent {
  @Input() modal: HTMLDialogElement | null = null;

  constructor(private formBuilder: FormBuilder) {}

  widgetForm = this.formBuilder.group({
    name: ["", Validators.required],
    displayType: ["number", Validators.required],
    dataSource: ["", Validators.required],
    unit: ["", Validators.required],
  });

  dataSources?: DataSource[];

  onSubmit() {
    console.log(this.widgetForm.value);

    if (this.widgetForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.modal?.close();
  }
}
