import { WidgetDisplayType } from "./app/dashboards/widgets/widget-display-type";

declare global {
  interface Project {
    id: string;
    name: string;
    description: string;
  }

  interface ProjectView extends Project {
    isLeader: boolean;
  }

  interface Task {
    id: string;
    name: string;
    description: string;

    startDate: string;
    dueDate: string;
    asignee: string;
    priority: number;
    status: number;
  }

  interface TaskData extends Task {
    tasks: Task[];
    breadcrumbs: (string | boolean)[][];
  }

  interface MainPageProject extends Project {
    breadcrumbs: (string | boolean)[][];
    projects: Project[];
    tasks: Task[];
  }

  interface ProjectData extends Project {
    parent: string;
    leaders: string;
    members: string;
  }

  interface RawCalendarCellData {
    date: number[];
    tasks: Task[];
  }

  interface CalendarCellData {
    date?: Date;
    tasks: Task[];
  }

  interface MainPageProjectCalendarView {
    tasks: RawCalendarCellData[];
    today: number[];
  }

  interface User {
    id: string;
    email: string;
    firstNames: string;
    lastNames: string;
  }

  // Dashboard types
  type TaskDashboard = Omit<Task, "startDate" | "asignee" | "status"> & {
    parentProject: string;
  };

  interface DataSource {
    id: string;
    name: string;
    mqttTopic: string;
  }

  interface Widget {
    id: string;
    name: string;
    displayType: WidgetDisplayType;
    mqttTopic: string;
    position: number;
    unit: string;
  }

  interface Dashboard {
    projectName: string;
    tasksToDo: TaskDashboard[];
    tasksToVerify: TaskDashboard[];

    widgets: Widget[];
    dataSources: DataSource[];
  }
}

export {};
