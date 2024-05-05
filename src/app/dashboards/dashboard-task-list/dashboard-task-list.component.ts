import { Component, Input } from "@angular/core";
import { TaskDashboard } from "../dashboard-main-page/dashboard-main-page.component";

@Component({
  selector: "app-dashboard-task",
  template: `
    <a href="{{ '/task/' + task.id }}">
      <div class="flex justify-between shadow-sm px-2 py-1">
        <div class="flex flex-col justify-between">
          <h3 class="font-bold">{{ task.name }}</h3>
          <p class="text-xs break-words">{{ task.description }}</p>
        </div>
        <div class="flex flex-col justify-between items-end min-w-fit">
          <p class="text-xs">{{ task.subproject }}</p>
          <p class="text-xs">FECHA LÍMITE: {{ task.dueDate }}</p>
        </div>
      </div>
    </a>
  `,
})
export class DashboardTaskComponent {
  @Input() task!: TaskDashboard;
}

@Component({
  selector: "app-dashboard-task-list",
  template: `
    <div class="h-full rounded-sm shadow-md overflow-y-auto">
      @for(task of tasks; track $index) {
      <app-dashboard-task [task]="task" />
      }
    </div>
  `,
})
export class DashboardTaskListComponent {
  @Input() tasks: TaskDashboard[] = [];
}
