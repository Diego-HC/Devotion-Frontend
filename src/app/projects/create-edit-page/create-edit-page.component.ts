import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../../api.service';

export interface Project {
  name: string;
  description: string;
  parent?: string;
  leaders: any;
  members: any;
}

@Component({
  selector: 'app-create-edit-page',
  template: `
  <div class = "px-16">
    <div class = "flex justify-center items-center">
      <div class="px-12 lg:w-1/2 py-10">
        <h1 class=" text-l font-roboto font-extrabold">Nuevo Proyecto</h1>
          <div class = "flex flex-row flex-grow items-center justify-center">
            <input type="text" class="input input-bordered flex-grow mr-4 shadow-md font-helvetica font-bold text-3xl"
            [(ngModel)]="projectData.name" (ngModelChange)="projectData.name = $event"/>
            <div class = "flex flex-col items-center justify-center">
              <button (click)="onSubmit()" class = "btn-circle flex items-center justify-center mt-4" style = "background-color: #2A4365">
              <app-plus-icon fill="white" width = "20" height = "20" class = "items-center justify-center"/>
              </button>
              <p class = "text-xs font-robotoCondensed">Publicar</p>
            </div>
          </div>

          <div class = "flex flex-col flex-grow justify-center">
          <h1 class=" text-l font-roboto font-extrabold mb-3">Descripción</h1>
            <textarea rows = "4" class="textarea textarea-bordered mr-4 shadow-md font-robotoCondensed text-s w-full min-h-10"
            [(ngModel)]="projectData.description" (ngModelChange)="projectData.description = $event"
            ></textarea>
          </div>
          <h1 class=" text-l font-roboto font-extrabold mb-3 mt-3">Líderes</h1>
          <app-search-select (selectedLeadersOutput)="onLeadersSelected($event)"></app-search-select>
          <h1 class=" text-l font-roboto font-extrabold mb-3 mt-3">Miembros</h1>
          <app-search-select (selectedMembersOutput)="onMembersSelected($event)"></app-search-select>
      </div>
    </div>
  </div>
  `
})
export class CreateEditPageComponent implements OnInit {
  constructor (private api: ApiService, private router: Router) {}


  @Input('parentProjectId') projectId! : string;
  projectResponse: any;

  projectData: Project = {
    name: '',
    description: '',
    leaders: [],
    members: [],
  };

  ngOnInit() {
    // Retrieve the parent project id 
    this.projectData.parent = this.projectId;
    console.log('parent: ' + this.projectData.parent);
  }

  onMembersSelected(members: string[]) {
    this.projectData.members = members;
  }

  onLeadersSelected(leaders: string[]) {
    this.projectData.leaders = leaders;
  }

  receiveMessage($event : any) {
    this.projectId = $event
  }

  onSubmit() {
    this.projectData.leaders = this.projectData.leaders.join(',');
    this.projectData.members = this.projectData.members.join(',');

    this.api.post('projects/', this.projectData)
    .subscribe((response) => {
      this.projectResponse = response;
      // navigate to project page
      this.router.navigateByUrl(`/project/${this.projectResponse.id}`)
    })
  }
}
