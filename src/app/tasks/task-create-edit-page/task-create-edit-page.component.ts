import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from "../../api.service";
import { ActivatedRoute} from "@angular/router";

export interface Task {
  name: string;
  description?: string;
  priority?: number;
  start_date?: string;
  due_date: string;
  parent_project: string;
  asignee: any;
}

@Component({
  selector: 'app-task-create-edit-page',
  template: `
    <div class="overflow-x-auto mx-32">
      <div class="bg-white py-8 rounded-lg">
        <h2 class="font-roboto font-bold">
          Nueva Tarea
        </h2>
        <div class="flex flex-row items-center mt-2 gap-4">
          <input type="text"
                 class="input-md input-bordered input-['#5CCEFF'] md:w-5/12 text-3xl font-helvetica rounded-box font-bold shadow-md"
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
        <h2 class="font-roboto font-bold mt-4">Descripción</h2>
        <textarea class="textarea-md text-['#5CCEFF'] textarea-bordered w-1/2 h-40 rounded-box shadow-md"
                  [(ngModel)]="taskData.description"
                  (ngModelChange)="taskData.description = $event">
        </textarea>
        <div class="w-1/2">
          <h2 class="font-roboto font-bold mt-4">Asignado</h2>
          <app-search-select (selectedMembersOutput)="onMembersSelected($event)" ></app-search-select>
        </div>
      </div>
    </div>
  `
})
export class TaskCreateEditPageComponent implements OnInit {

  constructor(private http: HttpClient, private api: ApiService, private route: ActivatedRoute) {
  }

  tasksResponse: any;
  taskData: Task = {
    name: '',
    description: '',
    priority: 0,
    start_date: '',
    due_date: '',
    parent_project: '',
    asignee: ''
  };

  projectId: string = '';

  onMembersSelected(members: string[]) {
    this.taskData.asignee = members;
  }

  ngOnInit() {
    // Retrieve project ID from route parameters
    this.route.queryParams.subscribe(params => {
      this.projectId = params['Parent'];
    });
  }

  onMemberSelected(memberId: string) {
    this.taskData.asignee = memberId;
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

    this.taskData.asignee = this.taskData.asignee.join(',');
    this.taskData.priority = priorityValue;
    this.taskData.parent_project = this.projectId;

    console.log(this.taskData);

    this.api.post('tasks/', this.taskData, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0Njc0MzIyLCJpYXQiOjE3MTMzNzgzMjIsImp0aSI6IjRkNGY2MDI0Nzg2NjQ3Y2ZiM2IwNTZhNWI4MDBmYmMxIiwidXNlcl9pZCI6IjI5YzQxNzk0LTAzM2QtNDRlYS05ZWY4LWExMjcxNjZiYmE1NSJ9.yEmFdABl4Mt9YmS-kSoD1QsGi4m73vhBYhkGHt-yJUA")
      .subscribe((response) => {
        this.tasksResponse = response;
      });
  }

  selectedPriority: string = 'Baja';

  updatePriority(priority: string) {
    this.selectedPriority = priority;
  }
}
