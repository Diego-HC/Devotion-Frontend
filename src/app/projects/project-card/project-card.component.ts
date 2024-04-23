import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-project-card",
  template: `
    <div class="flex flex-row gap-0 h-40">
      <span class="w-2 rounded-l-md" [ngClass]="this.colors.normal"></span>
      <a href="/project/{{ this.id }}">
        <div
          class="card card-normal rounded-l-none rounded-md w-60 flex flex-col justify-between h-40"
          [ngClass]="this.colors.light"
        >
          <h2 class="card-title mx-6 my-4">{{ this.shortName }}</h2>
          <p class="break-words text-xs mx-5 my-3">
            {{ this.shortDescription }}
          </p>
        </div>
      </a>
    </div>
  `,
})
export class ProjectCardComponent implements OnInit {
  @Input() id!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() colors!: { light: string; normal: string };

  shortName!: string;
  shortDescription!: string;

  ngOnInit() {
    this.shortName =
      this.name.length > 20 ? this.name.slice(0, 20) + "..." : this.name;
    this.shortDescription =
      this.description.length > 50
        ? this.description.slice(0, 55) + "..."
        : this.description;
  }
}
