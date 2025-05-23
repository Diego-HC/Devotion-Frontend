import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor() {
    this.clear();
  }

  project!: Project;
  task!: Task;
  userPool: User[] = [];
  pageWasReloaded = true;
  showConfirmDeletion = false;
  showConfirmGoBack = false;
  disableButton = true;
  loadingSubtasks = false;

  needsUpdateSubject = new Subject<void>();
  needsUpdate$ = this.needsUpdateSubject.asObservable();

  updatingWidget: string | null = null;

  triggerUpdate() {
    this.disableButton = true;
    this.needsUpdateSubject.next();
  }

  private _showAssignedTasks = new BehaviorSubject<boolean>(false);
  private _showSubtreeTasks = new BehaviorSubject<boolean>(false);

  showAssignedTasks$ = this._showAssignedTasks.asObservable();
  showSubtreeTasks$ = this._showSubtreeTasks.asObservable();

  set showAssignedTasks(value: boolean) {
    this._showAssignedTasks.next(value);
  }

  get showAssignedTasks() {
    return this._showAssignedTasks.getValue();
  }

  set showSubtreeTasks(value: boolean) {
    this._showSubtreeTasks.next(value);
  }

  get showSubtreeTasks() {
    return this._showSubtreeTasks.getValue();
  }

  clearProject(parent = "") {
    this.project = {
      id: "",
      name: "",
      description: "",
      parent: parent,
      leaders: [],
      members: []
    }
  }

  clearTask(parentProject = "", parentTask = "") {
    this.task = {
      id: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      assignee: {
        id: "",
        name: "",
        email: "",
        isLeader: false
      },
      priority: 0,
      status: 0,
      parentProject: parentProject,
      parentTask: parentTask
    }
  }

  clear() {
    this.clearProject();
    this.clearTask();
  }

  updateProjectFromResponse(projectResponse: ProjectResponse) {
    this.pageWasReloaded = false;
    if (Array.isArray(projectResponse.members) && Array.isArray(projectResponse.leaders)) {
      this.userPool = [...projectResponse.members, ...projectResponse.leaders];
    }
    this.project = {
      ...projectResponse,
    }
  }

  updateTaskFromResponse(taskResponse: TaskResponse) {
    this.pageWasReloaded = false;
    this.task = {
      ...taskResponse,
    }
  }

  projectRequestBody(): ProjectRequestBody {
    return {
      ...this.project,
      parent: this.project.parent || undefined,
      leaders: this.project.leaders.map(leader => leader.id).join(','),
      members: this.project.members.map(member => member.id).join(','),
    }
  }

  taskRequestBody(): TaskRequestBody {
    return {
      ...this.task,
      description: this.task.description,
      start_date: this.task.startDate,
      due_date: this.task.dueDate,
      assignee: this.task.assignee.id,
      parent_project: this.task.parentProject,
      parent_task: this.task.parentTask || undefined
    }
  }
}
