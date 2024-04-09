import { Component } from "@angular/core";

@Component({
  selector: "app-view-page",
  template: `
    <div
      class="flex flex-row flex-wrap gap-10 m-10 justify-center md:justify-normal"
    >
      @for (project of this.projects; track $index) {
      <app-project-card
        [id]="project.id"
        [name]="project.name"
        [description]="project.description"
      />
      }
    </div>
  `,
})
export class ViewPageComponent {
  projects = [
    {
      id: "1",
      name: "Project 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec odio nec urna tincidunt lacinia. Nulla facilisi. Nullam nec nunc nec nunc ultricies ultricies.",
    },
    { id: "2", name: "Project 2", description: "Description 2" },
    { id: "3", name: "Project 3", description: "Description 3" },
    {
      id: "4",
      name: "mmmmmmmmmm mmmmmmmmmmmmm",
      description:
        "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.",
    },
  ];
}
