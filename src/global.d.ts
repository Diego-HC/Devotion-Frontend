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
    priority: string;
    status: string;
  }

  interface MainPageProject extends Project {
    breadcrumbs: string[][];
    projects: Project[];
    tasks: Task[];
  }

  interface ProjectData extends Project {
    parent: string;
    leaders: string;
    members: string;
  }

  interface User {
    id: string;
    email: string;
    firstNames: string;
    lastNames: string;
  }
}

export {};
