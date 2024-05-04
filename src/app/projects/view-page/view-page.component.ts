import { cardColors } from "../../shared/cardColors";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";

@Component({
  selector: "app-view-page",
  template: `
    <app-loading *ngIf="projects === undefined" />
    <div
      *ngIf="projects !== undefined"
      class="flex flex-row flex-wrap gap-10 m-20 justify-center md:justify-normal"
    >
      @for (project of this.projects; track $index) {
        <app-project-card
          [id]="project.id"
          [name]="project.name"
          [description]="project.description"
          [colors]="cardColors[$index % cardColors.length]"
        />
      }

      <button (click)="newProject()" class="place-self-center w-[15.5rem]">
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
      </button>
    </div>
  `,
})
export class ViewPageComponent implements OnInit {
  constructor(private router: Router, private api: ApiService, private store: StoreService) {}

  projects: Project[] | undefined;
  cardColors = cardColors;

  ngOnInit(): void {
    this.store.pageWasReloaded = false;
    this.api.get("me/projects/").subscribe((projects) => {
      this.projects = projects;
    });
  }

  newProject() {
    this.store.clearProject();
    void this.router.navigateByUrl("/new/project");
  }
}
