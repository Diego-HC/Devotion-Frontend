import { Component, Input } from "@angular/core";
import { Project } from "../main-page/main-page.component";

@Component({
  selector: "app-subproject-card",
  template: `
    <div class="flex flex-row h-24">
      <span class="bg-slate-500 w-1.5 rounded-l-md"></span>
      <a href="/project/{{ this.id }}">
        <div
          class="flex flex-row items-center px-3 gap-2 card card-compact rounded-l-none rounded-md bg-slate-300 w-48 h-full"
        >
          <div class="flex flex-col justify-around h-full">
            <h2 class="text-sm font-bold">{{ this.shortName }}</h2>
            <p class="break-words text-xs">
              {{ this.shortDescription }}
            </p>
          </div>
          <div
            class="radial-progress bg-[#E1EFFF] text-[#2A4365] min-w-8"
            style="--value:{{
              this.progress
            }}; --size:2rem; --thickness: 0.5rem;"
            role="progressbar"
          ></div>
        </div>
      </a>
    </div>
  `,
})
export class SubprojectCardComponent {
  @Input() subproject: Project = {
    id: 0,
    name: "",
    description: "",
    progress: 0,
  };

  id: number = 0;
  name: string = "";
  description: string = "";
  progress: number = 23;

  shortName!: string;
  shortDescription!: string;

  ngOnInit() {
    // destructure the subproject object
    const { id, name, description, progress } = this.subproject;
    this.id = id;
    this.name = name;
    this.description = description;
    this.progress = progress;

    // shorten the name and description if they're too long

    this.shortName =
      this.name.length > 12 ? this.name.slice(0, 12) + "..." : this.name;
    this.shortDescription =
      this.description.length > 50
        ? this.description.slice(0, 55) + "..."
        : this.description;
  }
}
