import { WidgetDisplayType } from "./app/dashboards/widgets/widget-display-type";

declare global {
  // Usuarios
  // --------

  // Universal en todos los serializers
  interface BasicUser {
    id: string;
    name: string;
  }

  // Usuario
  interface User extends BasicUser {
    email: string;
    isLeader: boolean;
    profilePicture?: string;
  }

  // Proyectos
  // ---------

  // Universal en todos los serializers
  interface BasicProject {
    id: string;
    name: string;
    description: string;
  }

  // Usado en la vista de los proyectos del usuario
  interface BasicProjectWithRole extends BasicProject {
    isLeader: boolean;
  }

  // Almacenado en el store
  interface Project extends BasicProject {
    parent?: string;
    leaders: User[];
    members: User[];
  }

  // Usado en la página de un proyecto
  interface ProjectResponse extends Project {
    breadcrumbs: (string | boolean)[][];
    progress: number;
    projects: BasicProject[];
    tasks: TableTask[];
  }

  // Para crear y editar proyectos
  interface ProjectRequestBody extends Project {
    leaders: string;
    members: string;
  }

  // Tareas
  // ------

  // Universal en todos los serializers
  interface BasicTask {
    id: string;
    name: string;
    description: string;
  }

  // Almacenado en el store
  interface Task extends BasicTask {
    startDate: string;
    dueDate: string;
    assignee: User;
    priority: number;
    status: number;
    parentProject: string;
    parentTask?: string;
  }

  // Usado en la vista de tabla
  interface TableTask extends Task {
    assignee: string;
  }

  // Usado en la página de una tarea
  interface TaskResponse extends Task {
    tasks: TableTask[];
    breadcrumbs: (string | boolean)[][];
  }

  // Para crear y editar tareas
  interface TaskRequestBody extends BasicTask {
    start_date: string;
    due_date: string;
    assignee: string;
    priority: number;
    status: number;
    parent_project: string;
    parent_task?: string;
  }

  // Vistas adicionales
  // ------------------

  interface CalendarTask {
    id: string;
    name: string;
    status: number;
    priority: number;
  }

  interface RawCalendarCell {
    date: number[];
    tasks: CalendarTask[];
  }

  // Usado en generateCalendarMatrix()
  interface CalendarCell {
    date?: Date;
    tasks: CalendarTask[];
  }

  // Asume que se pasó get=tasks en el endpoint
  interface CalendarResponse {
    tasks: RawCalendarCell[];
    today: number[];
  }

  interface KanbanTask {
    id: string;
    name: string;
    description: string;
    priority: number;
    assignee: BasicUser;
  }

  interface KanbanLists {
    notStarted: KanbanTask[];
    inProgress: KanbanTask[];
    inReview: KanbanTask[];
    done: KanbanTask[];
  }

  // Asume que se pasó get=tasks en el endpoint
  interface KanbanResponse {
    tasks: KanbanLists;
  }

  // Dashboard
  // ---------

  type DashboardTask = Omit<Task, "startDate" | "assignee" | "status"> & {
    parentProject: string;
  };


  interface NormalWidget {
    name: string;
    value: number;
  }

  interface WidgetsBySeries {
    name: string;
    series: { name: string; value: number }[];
  }

  interface DashboardData {
    id: string;
    doneTasksCount: number;
    allDoneTasksCount: number;
    tasksByStatus: NormalWidget[];
    tasksByPriority: NormalWidget[];
    doneTasksByDate: WidgetsBySeries[];
    userWorkload: WidgetsBySeries[];
    projectProgress: number;
    allProjectProgress: number;
  }

  interface Widget {
    id: string;
    name: string;
    displayType: WidgetDisplayType;
    dataSource: DashboardData;
    validDisplayTypes: WidgetDisplayType[];
  }

  interface Dashboard {
    projectName: string;
    tasksToDo: DashboardTask[];
    tasksToVerify: DashboardTask[];

    widgets: Widget[];
    dataSources: DataSource[];
  }
}

export {};
