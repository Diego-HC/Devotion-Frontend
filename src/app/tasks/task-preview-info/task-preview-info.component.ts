import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-task-preview-info',
  template: `
    <div *ngIf="task === undefined" class="w-full h-[308px] flex justify-center items-center p-10 pt-0">
      <video autoplay loop muted class="w-20">
        <source src="/assets/animation.mp4" type="video/mp4"/>
        Video not supported
      </video>
    </div>
    <div *ngIf="task !== undefined" class="w-full p-10 pt-0">
      <div class="w-full flex flex-row">
        <h1 class="text-4xl font-helvetica mr-3 mb-3 line-clamp-2">
          {{ task.name }}
        </h1>
        <div class="flex justify-center items-center min-w-[80px]">
          <app-priority-icon [priority]="task.priority" />
        </div>
      </div>
      <div class="w-full flex flex-row items-center gap-4">
        <div class="dropdown dropdown-bottom">
          <app-badge
            [status]="statusName(task.status)"
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
      <div class="mt-3">
        <app-alert
          *ngIf="showWarning"
          [message]="warningMessage"
        ></app-alert>
      </div>
      <h3 class="font-roboto font-bold">Descripción</h3>
      <p
        class="font-robotoCondensed text-lg mb-4 text-[#5E6377] font-normal line-clamp-5"
      >
        {{ task.description }}
      </p>
      <h2 class="font-roboto font-bold">Asignado</h2>
      <p class="font-robotoCondensed font-normal">
        {{ task.assignee.name }}
      </p>
      <div class="flex gap-12 mt-4">
        <div class="flex flex-col">
          <h2 class="font-roboto font-bold">Fecha Inicio</h2>
          <p class="font-robotoCondensed font-normal">
            {{ task.startDate }}
          </p>
        </div>
        <div class="flex flex-col">
          <h2 class="font-roboto font-bold">Fecha Fin</h2>
          <p class="font-robotoCondensed font-normal">
            {{ task.dueDate }}
          </p>
        </div>
      </div>
    </div>
  `
})
export class TaskPreviewInfoComponent implements OnInit {
  constructor(private api: ApiService, private store: StoreService, private route: ActivatedRoute, private router: Router) { }

  task?: TaskResponse;
  @Input() taskId?: string;
  @Output() taskUpdated = new EventEmitter<void>();

  dropdownOpen = false;
  showWarning = false;
  warningMessage = "";

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.task = undefined;
          return this.api.get(`tasks/${this.taskId}/?get=info`);
          // return this.api.get(`tasks/${params["id"]}/`);
        })
      )
      .subscribe((response) => {
        this.store.updateTaskFromResponse(response)
        this.task = response;
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
      .put(`tasks/${this.task!.id}/status/`, { status: status })
      .subscribe(
        () => {
          this.task!.status = status;
          this.dropdownOpen = false;
          this.api.get(`tasks/${this.taskId}/?get=info`).subscribe((response) => {
            this.store.updateTaskFromResponse(response)
            this.task = response;
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
