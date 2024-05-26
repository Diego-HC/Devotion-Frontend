import { Component, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-task",
  template: `
    <a href="{{ '/task/' + task.id }}">
      <div class="flex shadow-sm px-2 py-1 h-16">
        <div class="w-10 flex-grow flex flex-col justify-between">
          <h3 class="font-bold truncate">{{ task.name }}</h3>
          <p class="text-xs line-clamp-2 break-words">
            {{ task.description }}
          </p>
        </div>
        <div
          class="ml-1 w-fit flex flex-shrink flex-col justify-between items-end max-w-48"
        >
          <p class="text-xs line-clamp-2 break-words max-w-36">
            {{ task.parentProject }}
          </p>
          <p class="text-xs">Fecha Límite: {{ task.dueDate }}</p>
        </div>
      </div>
    </a>
  `,
})
export class DashboardTaskComponent {
  @Input() task!: DashboardTask;
}

@Component({
  selector: "app-dashboard-task-list",
  template: `
    <div class="w-full flex-grow h-56 rounded-sm shadow-md overflow-y-auto">
      @for(task of tasks; track $index) {
      <app-dashboard-task [task]="task" />
      }
    </div>
  `,
})
export class DashboardTaskListComponent {
  @Input() tasks: DashboardTask[] = [];
}
