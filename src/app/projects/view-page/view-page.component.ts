import { Component } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {ApiService} from "../../api.service";
import { HttpHeaders } from '@angular/common/http';
import { OnInit} from '@angular/core';

@Component({
  selector: "app-view-page",
  template: `
    <div
      class="flex flex-row flex-wrap gap-10 m-20 justify-center md:justify-normal"
    >
      @for (project of this.projects; track $index) {
      <app-project-card
        [id]="project.id"
        [name]="project.name"
        [description]="project.description"
      />
      }

      <a href="/new/project" class="place-self-center w-[15.5rem]">
        <div class="flex flex-col place-items-center justify-center">
          <div
            class="grid grid-cols-1 grid-rows-1 place-items-center border-2 border-gray-200 rounded-full p-5 box-shadow"
          >
            <app-plus-icon
              fill="#2A4365"
              [width]="'45'"
              [height]="'45'"
            ></app-plus-icon>
          </div>
          <span class="font-robotoCondensed">Nuevo proyecto</span>
        </div>
      </a>
    </div>
  `,
})
export class ViewPageComponent implements OnInit{
  constructor(private api: ApiService, private http: HttpClient) {}

  projectResponse: any;
  projects : any[] = [];

  ngOnInit(): void {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NzU4NTMzLCJpYXQiOjE3MTM0NjI1MzMsImp0aSI6IjZhMjBjYTMyNDljODQ0M2ZiMzliZjYyY2Q2ZDRhNDM4IiwidXNlcl9pZCI6ImU3MjlhODBkLTAwMzMtNGUwZS04ODkxLTIwMDg1MjEyYjQ0NSJ9.ZYl_b3dC99PAhPsGzeYwmc9wInv2iS4TylqRa4kdv-o"
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    })
    const url = 'https://api.umm-actually.com/me/projects/';
    this.http.get<any[]>(url, {headers}).subscribe((projects: any[]) => {
      this.projects = projects;
      console.log(this.projects);
    });
  }
}
