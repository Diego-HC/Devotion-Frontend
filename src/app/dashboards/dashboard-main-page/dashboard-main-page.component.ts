import { Component } from "@angular/core";

export type TaskDashboard = Omit<Task, "startDate" | "asignee" | "status"> & {
  subproject: string;
};

@Component({
  selector: "app-dashboard-main-page",
  template: `
    <div class="ml-20 mr-10">
      <!-- <h1 class="text-3xl font-semibold text-gray-800"></h1> -->

      <div class="grid grid-cols-2 gap-4 w-full max-h-80">
        <app-dashboard-task-list [tasks]="tasksToDo" class="flex-grow" />
        <app-dashboard-task-list [tasks]="tasksToVerify" class="flex-grow" />
      </div>
    </div>
  `,
})
export class DashboardMainPageComponent {
  tasksToDo: TaskDashboard[] = [
    {
      id: "1",
      name: "Task 1",
      description: "Description 1",
      dueDate: "2021-01-01",
      priority: 1,
      subproject: "Subproject 1",
    },
    {
      id: "1",
      name: "Task 2",
      description: "Description 2",
      dueDate: "2021-01-02",
      priority: 1,
      subproject: "Subproject 1",
    },
    {
      id: "1",
      name: "Task 3",
      description: "Description 3",
      dueDate: "2021-01-03",
      priority: 1,
      subproject: "Subproject 1",
    },
  ];

  tasksToVerify: TaskDashboard[] = [
    {
      id: "1",
      name: "Task 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec eros tincidunt lacinia. Nullam nec purus nec eros tincidunt lacinia.",
      dueDate: "2021-01-01",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 5",
      description: "Description 5",
      dueDate: "2021-01-02",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 6",
      description: "Description 6",
      dueDate: "2021-01-03",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 7",
      description: "Description 7",
      dueDate: "2021-01-04",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 8",
      description: "Description 8",
      dueDate: "2021-01-05",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 9",
      description: "Description 9",
      dueDate: "2021-01-06",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 10",
      description: "Description 10",
      dueDate: "2021-01-07",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 11",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec eros tincidunt lacinia. Nullam nec purus nec eros tincidunt lacinia. Nullam nec purus nec eros tincidunt lacinia. Nullam nec purus nec eros tincidunt lacinia.",
      dueDate: "2021-01-01",
      priority: 1,
      subproject: "Subproject 2",
    },
    {
      id: "1",
      name: "Task 12",
      description:
        "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.",
      dueDate: "2021-01-01",
      priority: 1,
      subproject: "Subproject 2",
    },
  ];
}
