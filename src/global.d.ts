declare global {
  interface Project {
    id: string;
    name: string;
    description: string;
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
}

export {};
