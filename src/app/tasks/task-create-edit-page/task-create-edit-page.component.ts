import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";

export interface Task {
  name: string;
  description?: string;
  priority?: number;
  start_date?: string;
  due_date: string;
  parent_project: string;
  parent_task?: any;
  asignee: any;
}

@Component({
  selector: 'app-task-create-edit-page',
  template: `
    <div class="overflow-x-auto mx-32">
      <div class="bg-white py-8 rounded-lg">
        <h2 class="font-roboto font-bold md:m-0.5">
          Nueva Tarea
        </h2>
        <div class="flex flex-row items-center mt-2 gap-4">
          <input type="text"
                 class="input-md input-bordered input-['#5CCEFF'] md:w-5/12 md:m-0.5 text-3xl font-helvetica rounded-box font-bold shadow-md"
                 [(ngModel)]="taskData.name" (ngModelChange)="taskData.name = $event"/>
          <div class="flex flex-col items-center">
            <button (click)="onSubmit()" class="btn-circle items-center justify-center"
                    style="background-color: #2A4365">+
            </button>
            <p class="text-xs font-robotoCondensed">Publicar</p>
          </div>
        </div>
        <div class="flex flex-row items-center mt-2 gap-8">
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Fecha Inicio</h2>
            <input type="date" class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"
                   [(ngModel)]="taskData.start_date" (ngModelChange)="taskData.start_date = $event"/>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Fecha Fin</h2>
            <input type="date" class="input-md input-bordered input-['#5CCEFF'] md:w-40 font-helvetica font-bold"
                   [(ngModel)]="taskData.due_date" (ngModelChange)="taskData.due_date = $event"/>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="font-roboto font-bold">Prioridad</h2>
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
        <h2 class="font-roboto font-bold mt-4 md:m-0.5">Descripción</h2>
        <textarea class="textarea-md text-['#5CCEFF'] textarea-bordered w-1/2 h-40 md:m-0.5 rounded-box shadow-md"
                  [(ngModel)]="taskData.description"
                  (ngModelChange)="taskData.description = $event">
        </textarea>
        <div class="w-1/2 md:m-1">
          <h2 class="font-roboto font-bold mt-4 md:m-0.5">Asignado</h2>
          <app-search-select [projectId]="parentProject" [singleSelectedMode]="true"
                             (selectedMembersOutput)="onMembersSelected($event)"></app-search-select>
        </div>
        <app-alert *ngIf="!taskResponse" [showWarning]="showWarning" [message]="warningMessage"></app-alert>
      </div>
    </div>
  `
})
export class TaskCreateEditPageComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  taskResponse: any;
  taskData: Task = {
    name: '',
    description: '',
    priority: 0,
    start_date: '',
    due_date: '',
    parent_project: '',
    parent_task: null,
    asignee: ''
  };

  parentProject: string = '';
  showWarning: boolean = false;
  warningMessage: string = '';
  isSubtask: boolean = false;

  parentTaskIdInfo: string = '';

  onMembersSelected(members: string[]) {
    this.taskData.asignee = members[0];
  }

  // Get the parent task info if the task is a subtask of another task
  taskInfo() {
    // Get the parent task id from the URL
    this.route.queryParams.subscribe(params => {
      this.parentTaskIdInfo = params['Parent'];
    });
    // If the task is a subtask, get the parent task info
    this.api.get(`tasks/${this.parentTaskIdInfo}`).subscribe((response) => {
      if (response.parent_task == null) { // if the parent_task is null, the task is a subtask of a PROJECT
        this.isSubtask = true;
        this.parentProject = response.parentProject;
        this.taskData.parent_task = response.id;
      }
      else if (response.parentTask) { // if the parentTask is not null, the task is a subtask of another TASK
        this.isSubtask = true;
        this.parentProject = response.parentProject;
        this.taskData.parent_task = response.parentTask;
      }
    });
  }

  // Call the function when the component is initialized
  ngOnInit() {
    this.taskInfo();
  }

  onSubmit() {
    let priorityValue: number;
    switch (this.selectedPriority) {
      case 'Baja':
        priorityValue = 0;
        break;
      case 'Media':
        priorityValue = 1;
        break;
      case 'Alta':
        priorityValue = 2;
        break;
      default:
        priorityValue = -1; // Default value if priority is not recognized
    }

    this.taskData.priority = priorityValue;
    this.taskData.parent_project = this.parentProject;

    this.api.post('tasks/', this.taskData).subscribe((response) => {
        this.taskResponse = response;
        this.router.navigateByUrl(`/task/${this.taskResponse.id}`)
    },
      (error) => {
        this.showWarning = true;
        this.warningMessage = "Error al crear la tarea. Por favor, inténtelo de nuevo. \n Procura que todos los campos estén completos.";
        console.log(error);
      }
    );
  }

  selectedPriority: string = 'Baja';

  updatePriority(priority: string) {
    this.selectedPriority = priority;
  }
}
