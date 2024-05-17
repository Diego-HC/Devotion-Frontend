import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor() {
    this.clear();
  }

  project!: ProjectData;
  task!: Task;
  membersPool: MinimalUser[] = [];
  pageWasReloaded = true;
  showConfirmDeletion = false;
  showConfirmGoBack = false;

  // dashboard data
  dataSources?: DataSource[];
  widget?: Widget;

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

  updateProjectFromResponse(projectResponse: MainPageProject) {
    this.pageWasReloaded = false;
    this.membersPool = projectResponse.members;
    this.project = {
      ...projectResponse,
    }
  }

  updateTaskFromResponse(taskResponse: TaskData) {
    this.pageWasReloaded = false;
    this.task = {
      ...taskResponse,
    }
  }

  projectPostBody(): ProjectPostBody {
    return {
      ...this.project,
      parent: this.project.parent || undefined,
      leaders: this.project.leaders.map(leader => leader.id).join(','),
      members: this.project.members.map(member => member.id).join(',')
    }
  }

  taskPostBody(): TaskPostBody {
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
