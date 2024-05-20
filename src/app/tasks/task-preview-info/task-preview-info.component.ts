import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-task-preview-info',
  template: `
    <div class="md:mx-10 md:mt-2" *ngIf="taskResponse !== undefined">
      <div class="bg-white rounded-lg">
        <div class="flex flex-row justify-between md:gap-12">
          <div class="flex flex-row">
            <h1 class="text-4xl font-helvetica md:mr-3">
              {{ taskResponse.name }}
            </h1>
            <app-priority-icon [priority]="taskResponse.priority"/>
          </div>
        </div>
        <div class="flex flex-row items-center md:gap-4">
          <div class="dropdown dropdown-bottom">
            <app-badge
              [status]="statusName(taskResponse.status)"
              tabindex="0"
              role="button"
            ></app-badge>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52"
            >
              <li><a (click)="updateStatus(0)">No iniciado</a></li>
              <li><a (click)="updateStatus(1)">En proceso</a></li>
              <li><a (click)="updateStatus(2)">En revisión</a></li>
              <li><a (click)="updateStatus(3)">Completado</a></li>
            </ul>
          </div>
          <div class="dropdown dropdown-right">
            <div tabindex="0" role="button" class="text-lg cursor-pointer badge badge-outline text-[#5CCEFF]">•••</div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a class="flex flex-row gap-2" routerLink="/edit/task">
                <app-pencil-icon [detailed]="false" fill="#2A4365" width="15" height="15"/>
                Editar
              </a></li>
            </ul>
          </div>
        </div>
        <div class="md:mt-3">
          <app-alert
            *ngIf="showWarning"
            [message]="warningMessage"
          ></app-alert>
        </div>
        <h3 class="font-roboto font-bold">Descripción</h3>
        <p
          class="font-robotoCondensed text-lg md:mb-4 text-[#5E6377] font-normal max-h-32 overflow-auto whitespace-pre-line break-words"
        >
          {{ taskResponse.description }}
        </p>
        <h2 class="font-roboto font-bold">Asignado</h2>
        <p class="font-robotoCondensed font-normal">
          {{ taskResponse.assignee.name }}
        </p>
        <div class="flex md:gap-12 md:mt-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-bold">Fecha Inicio</h2>
            <p class="font-robotoCondensed font-normal">
              {{ taskResponse.startDate }}
            </p>
          </div>
          <div class="flex flex-col">
            <h2 class="font-roboto font-bold">Fecha Fin</h2>
            <p class="font-robotoCondensed font-normal">
              {{ taskResponse.dueDate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskPreviewInfoComponent implements OnInit {
  constructor(private api: ApiService, private store: StoreService, private route: ActivatedRoute, private router: Router) { }

  taskResponse?: TaskData;
  @Input() taskId?: string;
  @Output() taskUpdated = new EventEmitter<void>();

  dropdownOpen = false;
  showWarning = false;
  warningMessage = "";

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.taskResponse = undefined;
          return this.api.get(`tasks/${this.taskId}/?get=info`);
          // return this.api.get(`tasks/${params["id"]}/`);
        })
      )
      .subscribe((response) => {
        this.store.updateTaskFromResponse(response)
        this.taskResponse = response;
      });

  }

  statusName(status: number) {
    switch (status) {
      case 0:
        return "No iniciado";
      case 1:
        return "En proceso";
      case 2:
        return "En revisión";
      case 3:
        return "Completado";
      default:
        return "No iniciado";
    }
  }

  updateStatus(status: number) {
    this.api
      .put(`tasks/${this.taskResponse!.id}/status/`, { status: status })
      .subscribe(
        () => {
          this.taskResponse!.status = status;
          this.dropdownOpen = false;
          this.api.get(`tasks/${this.taskId}/?get=info`).subscribe((response) => {
            this.store.updateTaskFromResponse(response)
            this.taskResponse = response;
            this.store.triggerUpdate(); // Emit event when task is updated
            this.taskUpdated.emit();
          });
        },
        (error) => {
          this.showWarning = true;
          this.warningMessage = error.error.message;
        }
      );
  }

}
