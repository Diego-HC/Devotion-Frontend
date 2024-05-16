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
          [isLeader]="project.isLeader"
        />
      }

      <button (click)="newProject()" class="w-[248px] h-[160px] rounded-md border-2 border-gray-200">
        <div class="flex flex-col gap-2 place-items-center justify-center">
          <app-new-project-icon
            fill="#2A4365"
            width="40"
            height="40"
          />
          <span class="font-robotoCondensed">Nuevo proyecto</span>
        </div>
      </button>
    </div>
  `,
})
export class ViewPageComponent implements OnInit {
  constructor(private router: Router, private api: ApiService, private store: StoreService) {}

  projects: ProjectView[] | undefined;
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
