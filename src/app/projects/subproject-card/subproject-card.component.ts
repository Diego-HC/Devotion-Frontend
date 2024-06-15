import { Component, Input } from "@angular/core";

@Component({
  selector: "app-subproject-card",
  template: `
    <div class="flex flex-row h-24">
      <span class="w-1.5 rounded-l-md" [ngClass]="this.colors?.normal"></span>
      <app-protected-link href="/project/{{ this.id }}">
        <div
          [ngClass]="this.colors?.light"
          class="flex flex-row items-center px-3 gap-2 card card-compact rounded-l-none rounded-md w-48 h-full"
        >
          <div class="flex flex-col justify-around h-full">
            <h2 class="text-sm font-bold">{{ this.shortName }}</h2>
            <p class="break-words text-xs">
              {{ this.shortDescription }}
            </p>
          </div>
          <div
            class="radial-progress bg-devotionSecondary text-devotionPrimary min-w-8"
            [style]="{'--value':this.progress, '--size':'2rem', '--thickness': '0.5rem'}"
            role="progressbar"
          ></div>
        </div>
      </app-protected-link>
    </div>
  `,
})
export class SubprojectCardComponent {
  @Input() subproject: any = {
    id: "",
    name: "",
    description: "",
    progress: 0,
  };
  @Input() colors!: { light: string; normal: string };

  id: string = "";
  name: string = "";
  description: string = "";
  progress: number = 0;

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
