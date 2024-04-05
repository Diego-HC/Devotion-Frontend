import { Component, Input } from "@angular/core";

@Component({
  selector: "app-project-card",
  template: `
    <div
      class="flex flex-row card card-normal card-bordered rounded-md bg-slate-300"
    >
      <span class="bg-slate-500 w-2 rounded-l-md"></span>
      <a href="/project/{{ this.id }}" class="p-5 flex-grow">
        <h2 class="card-title">{{ this.name }}</h2>
        <p class="card-body">{{ this.description }}</p>
      </a>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() description!: string;
}
