import { Component } from "@angular/core";

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
  ];
}
