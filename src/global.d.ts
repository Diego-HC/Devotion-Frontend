declare global {
  interface Project {
    id: string;
    name: string;
    description: string;
  }

  interface ProjectData extends Project {
    parent: string;
    members: MinimalUser[];
    leaders: MinimalUser[];
  }

  interface TaskPostBody {
    id: string;
    name: string;
    description?: string;
    start_date: string;
    due_date: string;
    assignee: string;
    priority: number;
    status: number;
    parent_project: string;
    parent_task?: string;
  }

  interface Task {
    id: string;
    name: string;
    description: string;
    startDate: string;
    dueDate: string;
    assignee: MinimalUser;
    priority: number;
    status: number;
    parentProject: string;
    parentTask?: string;
  }

  interface TaskData extends Task {
    tasks: Task[];
    breadcrumbs: (string | boolean)[][];
  }

  interface MainPageProject extends ProjectData {
    breadcrumbs: (string | boolean)[][];
    projects: Project[];
    tasks: Task[];
  }

  interface ProjectPostBody extends Project {
    parent?: string;
    leaders: string;
    members: string;
  }

  interface User {
    id: string;
    email: string;
    firstNames: string;
    lastNames: string;
  }

  interface MinimalUser {
    id: string;
    name: string;
  }
}

export {};
