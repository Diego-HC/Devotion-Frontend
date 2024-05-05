import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { bgBlack, bgBlue } from "ansi-colors";
import { ApiService } from "../../api.service";
import { cardColors } from "../../shared/cardColors";

@Component({
  selector: "app-main-page",
  template: `
    <app-loading *ngIf="response === undefined"/>
    <app-breadcrumbs
      *ngIf="response !== undefined"
      [breadcrumbs]="response.breadcrumbs"
    />
    <div class="overflow-x-auto mx-20 mt-4" *ngIf="response !== undefined">
      <div class="bg-white py-6 rounded-lg">
        <div class="flex flex-row justify-between gap-20">
          <div class="flex flex-col mb-7">
            <div class="flex flex-row gap-6">
              <h1 class="text-4xl font-helvetica">
                {{ response.name }}
              </h1>
              <div
                class="radial-progress bg-devotionSecondary text-devotionPrimary"
                [style]="{'--value':response.progress, '--size':'2rem', '--thickness': '0.5rem'}"
                role="progressbar"
              ></div>
            </div>
            <div class="flex flex-row items-center gap-4">
              <a href="/dashboard" class="flex flex-row items-center gap-2">
                <app-dashboard-icon
                  fill="#5CCEFF"
                  width="25"
                  height="25"
                ></app-dashboard-icon>
                <span class="font-bold hover:underline text-base text-devotionAccent"
                >Ir a dashboard</span
                >
              </a>
              <a href="/members/project/{{ response.id }}">
                <span class="font-bold hover:underline text-base text-devotionAccent">Ver miembros</span>
              </a>
              <div class="dropdown dropdown-right">
                <div tabindex="0" role="button" class="text-lg cursor-pointer badge badge-outline text-devotionAccent">
                  •••
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a href="/edit/project/{{ response.id }}">Editar</a></li>
                  <li><a>Borrar</a></li>
                </ul>
              </div>
            </div>
            <p
              class="font-robotoCondensed text-lg my-4 max-w-3xl text-[#5E6377] font-normal"
            >
              {{ response.description }}
            </p>
          </div>

          <div class="mx-4 flex-grow">
            <h3 class="font-bold">Subproyectos:</h3>
            <div
              class="flex flex-col flex-wrap content-start gap-4 ml-2 mt-2 h-60 overflow-x-scroll"
            >
              @for (subproject of response.projects; track $index) {
                <app-subproject-card
                  [subproject]="subproject"
                  [colors]="cardColors[$index % cardColors.length]"
                />
              }
              <a
                href="/new/project?Parent={{ response.id }}"
                class="place-self-center w-[12.375rem] h-24"
                (click)="sendDataToNewProject(response.id)"
              >
                <div
                  class="flex flex-col place-items-center justify-center h-full"
                >
                  <div
                    class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow"
                  >
                    <app-plus-icon
                      fill="#2A4365"
                      [width]="'15'"
                      [height]="'15'"
                    ></app-plus-icon>
                  </div>
                  <span class="font-robotoCondensed text-sm"
                  >Nuevo Subproyecto</span
                  >
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <h3 class="font-bold mb-4">Tareas</h3>
          <div class="flex flex-row items-center gap-5">
            <app-icon
              iconType="table"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-table-icon
                class="col-start-1 row-start-1"
                [fill]="selectedIcon === 'table' ? '#FFFFFF' : '#2A4365'"
              ></app-table-icon>
            </app-icon>
            <app-icon
              iconType="kanban"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-kanban-icon
                class="col-start-1 row-start-1"
                [fill]="selectedIcon === 'kanban' ? '#FFFFFF' : '#2A4365'"
              ></app-kanban-icon>
            </app-icon>
            <app-icon
              iconType="calendar"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-calendar-icon
                class="col-start-1 row-start-1"
                [fill]="selectedIcon === 'calendar' ? '#FFFFFF' : '#2A4365'"
              ></app-calendar-icon>
            </app-icon>
            <app-icon
              iconType="roadmap"
              [selectedIcon]="selectedIcon"
              (selectedIconChange)="onTabClick($event)"
            >
              <app-roadmap-icon
                class="col-start-1 row-start-1"
                [fill]="selectedIcon === 'roadmap' ? '#FFFFFF' : '#2A4365'"
              ></app-roadmap-icon>
            </app-icon>
            <a
              href="/new/task?Parent={{ response.id }}&Type=[Task]"
              (click)="onTabClick('newTask')"
            >
              <div class="flex flex-col place-items-center justify-center">
                <div
                  class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-2.5 box-shadow"
                >
                  <app-plus-icon
                    fill="#2A4365"
                    [width]="'25'"
                    [height]="'25'"
                  ></app-plus-icon>
                </div>
                <span class="font-robotoCondensed">Nueva tarea</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <app-table *ngIf="currentView === 'table'" [tasks]="response.tasks"/>
      <app-kanban *ngIf="currentView === 'kanban'"/>
      <app-calendar *ngIf="currentView === 'calendar'" [projectOrTaskId]="response.id" [isTask]="false"/>
      <app-roadmap *ngIf="currentView === 'roadmap'"/>
    </div>
  `,
})
export class MainPageComponent implements OnInit {
  // response: MainPageProject | undefined = JSON.parse('{"id":"4bfca576-83d2-447a-9b79-cdc778417c84","name":"FSAE 2024","description":"Ser la mejor escudería en al competencia SAE Formula Student con un vehículo monoplaza reconocido por nuestra excelencia en el diseño y construcción. Aspiramos a inspirar a las generaciones futuras demostrando que con pasión, determinación y trabajo en equipo podemos alcanzar nuestros objetivos en el mundo del automovilismo","breadcrumbs":[["4bfca576-83d2-447a-9b79-cdc778417c84","FSAE 2024",false]],"tasks":[{"id":"184e3f2b-ad30-434f-b2ec-84a1c5b982f2","name":"Junta de sprints","description":"No sé porqué se complicaron con el operador =, agregando == no solicitado, y la coma (,) utilizando un delimitador. Como consecuencia la entrada = # lo marca como error, cuando el = debió haberlo aceptado, y == lo marca como operador relacional en lugar de 2 operadores =. También, equivocadamente acepta mayúsculas en los identificadores.","status":3,"priority":1,"startDate":"2024-04-18","dueDate":"2024-04-20","asignee":"Daniel Ricciardo","parentProject":"4bfca576-83d2-447a-9b79-cdc778417c84","parentTask":null},{"id":"c90d363f-5221-45ec-86a5-ffbe335fb054","name":"Junta Marketing","description":"Revisar nuevos logos","status":1,"priority":1,"startDate":"2024-04-19","dueDate":"2024-04-19","asignee":"Esteban Ocon","parentProject":"4bfca576-83d2-447a-9b79-cdc778417c84","parentTask":null},{"id":"cb7430cd-3dc1-4019-8f9b-a516a03aa855","name":"Junta proveedor","description":"Junta con perficient","status":1,"priority":2,"startDate":"2024-04-19","dueDate":"2024-04-19","asignee":"Robert Kubica","parentProject":"4bfca576-83d2-447a-9b79-cdc778417c84","parentTask":null}],"projects":[{"id":"5f6f6cd3-90eb-4c58-8700-c8fd102d4c17","name":"Suspensión","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat tortor eget lacus ultricies, nec ullamcorper risus viverra. Pellentesque non ultrices nibh."},{"id":"590d2b66-8aa4-437c-9e28-50a699736f19","name":"Finanzas","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat tortor eget lacus ultricies, nec ullamcorper risus viverra. Pellentesque non ultrices nibh."},{"id":"e2ad13c0-d81a-4177-b0b1-d89aa350584e","name":"Marketing","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat tortor eget lacus ultricies, nec ullamcorper risus viverra. Pellentesque non ultrices nibh."},{"id":"11331d71-0296-45f8-a90d-516c014c3276","name":"Motor","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat tortor eget lacus ultricies, nec ullamcorper risus viverra. Pellentesque non ultrices nibh."},{"id":"887ebfdd-bd39-417c-9b42-90396c2b8e59","name":"Chasis","description":"Ser la mejor escudería en al competencia SAE Formula Student con un vehículo monoplaza reconocido por nuestra excelencia en el diseño y construcción. Aspiramos a inspirar a las generaciones futuras demostrando que con pasión, determinación y trabajo en equipo podemos alcanzar nuestros objetivos en el mundo del automovilismo"},{"id":"8be332b4-135e-440b-8045-68e773a55c3c","name":"Electrónica","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat tortor eget lacus ultricies, nec ullamcorper risus viverra. Pellentesque non ultrices nibh."}],"progress":33.33333333333333}');
  response?: MainPageProject;
  cardColors = cardColors;

  constructor(
    protected api: ApiService,
    private route: ActivatedRoute
  ) {}

  currentView: string = "table"; // Default view
  selectedIcon: string = "table";
  // To send the parentId to the new project page
  @Output() parentProject = new EventEmitter<string>();

  onTabClick(selected: string) {
    this.currentView = selected;
    this.selectedIcon = selected;
  }

  // ngOnInit() { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.api.get(`projects/${params["id"]}/`).subscribe((response) => {
        this.response = response;
      });
    });
  }

  sendDataToNewProject(parentProjectId: string) {
    this.parentProject.emit(parentProjectId);
  }

  protected readonly bgBlack = bgBlack;
  protected readonly bgBlue = bgBlue;
}
