import { Component, Input } from "@angular/core";

@Component({
  selector: "app-project-card",
  template: `
    <div class="flex flex-row gap-0 h-40">
      <span class="w-2 rounded-l-md" [ngClass]="this.colors?.normal"></span>
      <a href="/project/{{ this.id }}">
        <div
          class="card card-normal rounded-l-none rounded-md w-60 flex flex-col justify-between h-40"
          [ngClass]="this.colors?.light"
        >
          <div class="flex flex-col gap-2">
            <h2
              class="break-words line-clamp-2 max-w-full text-xl font-black mx-6 mt-4"
            >
              {{ this.name }}
            </h2>
            @if (this.isLeader) {
            <div
              class="px-2 py-1 opacity-50 rounded-md w-fit text-white text-xs mx-6"
              [ngClass]="this.colors?.normal"
            >
              <p class="opacity-100">{{ "Líder" }}</p>
            </div>
            }
          </div>
          <p class="break-words line-clamp-2 text-xs mx-5 my-3">
            {{ this.description }}
          </p>
        </div>
      </a>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() colors!: { light: string; normal: string };
  @Input() isLeader!: boolean;
}
