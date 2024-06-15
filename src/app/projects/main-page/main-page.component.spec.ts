import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainPageComponent } from "./main-page.component";
import { ApiService } from "../../api.service";
import { HttpClientModule } from "@angular/common/http";
import { OAuthModule, OAuthService } from "angular-oauth2-oidc";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { LoadingComponent } from "../../shared/loading/loading.component";
import { By } from "@angular/platform-browser";
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { DashboardIconComponent } from "../../shared/icons/dashboard-icon/dashboard-icon.component";
import { PencilIconComponent } from "../../shared/icons/pencil-icon/pencil-icon.component";
import { PlusIconComponent } from "../../shared/icons/plus-icon/plus-icon.component";
import { IconComponent } from "../../shared/icon/icon.component";
import { TableIconComponent } from "../../shared/icons/table-icon/table-icon.component";
import { KanbanIconComponent } from "../../shared/icons/kanban-icon/kanban-icon.component";
import { CalendarIconComponent } from "../../shared/icons/calendar-icon/calendar-icon.component";
import { RoadmapIconComponent } from "../../shared/icons/roadmap-icon/roadmap-icon.component";
import { TableComponent } from "../../tasks/table/table.component";
import { LinkIconComponent } from "../../shared/icons/link-icon/link-icon.component";
import { TaskPreviewComponent } from "../../tasks/task-preview/task-preview.component";
import { XIconComponent } from "../../shared/icons/x-icon/x-icon.component";
import { TaskPreviewInfoComponent } from "../../tasks/task-preview-info/task-preview-info.component";
import { FullscreenIconComponent } from "../../shared/icons/fullscreen-icon/fullscreen-icon.component";
import { PriorityIconComponent } from "../../shared/icons/priority-icon/priority-icon.component";
import { BadgeComponent } from "../../shared/badge/badge.component";
import { KanbanSectionComponent } from "../../kanban-section/kanban-section.component";
import { KanbanComponent } from "../../tasks/kanban/kanban.component";

function waitForProperty<T>(
  getter: () => T,
  interval = 200,
  timeout = 5000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      const value = getter();
      if (value !== undefined) {
        clearInterval(timer);
        resolve(value);
      }
    }, interval);

    setTimeout(() => {
      clearInterval(timer);
      reject(new Error("Timeout waiting for property"));
    }, timeout);
  });
}

describe("MainPageComponent", () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainPageComponent,
        LoadingComponent,
        BreadcrumbsComponent,
        DashboardIconComponent,
        PencilIconComponent,
        PlusIconComponent,
        IconComponent,
        TableIconComponent,
        KanbanIconComponent,
        CalendarIconComponent,
        RoadmapIconComponent,
        TableComponent,
        LinkIconComponent,
        TaskPreviewComponent,
        XIconComponent,
        TaskPreviewInfoComponent,
        FullscreenIconComponent,
        PriorityIconComponent,
        BadgeComponent,
        KanbanComponent,
        KanbanSectionComponent,
      ],
      providers: [
        {
          provide: ApiService,
          useValue: {
            // return an observable that emits a response
            get: (url: string) => {
              if (url.startsWith("tasks")) {
                return {
                  subscribe: (fn: (value: any) => void) => {
                    fn({
                      id: "632fe89d-7afe-4f8d-ac36-81fb51f63c5c",
                      name: "Task Name",
                      description: "Task Description",
                      startDate: "2021-12-31",
                      dueDate: "2022-01-31",
                      assignee: {
                        name: "Assignee Name",
                      },
                      priority: 1,
                      status: 1,
                      parentProject: "Parent Project",
                      tasks: [],
                      breadcrumbs: [],
                    });
                  },
                };
              }

              return {
                subscribe: (fn: (value: any) => void) => {
                  fn({
                    id: "632fe89d-7afe-4f8d-ac36-81fb51f63c5c",
                    name: "Task Name",
                    description: "Task Description",
                    assignee: {
                      name: "Assignee Name",
                    },
                    startDate: "2021-12-31",
                    dueDate: "2022-01-31",
                  });
                },
              };
            },
            put: (url: string, body: any) => {
              return {
                subscribe: (fn: (value: any) => void) => {
                  fn({
                    status: body.status,
                  });
                },
              };
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
              subscribe: (fn: (value: any) => void) =>
                fn({
                  id: "632fe89d-7afe-4f8d-ac36-81fb51f63c5a",
                }),
              pipe: () => {
                return {
                  subscribe: (fn: (value: any) => void) =>
                    fn({
                      id: "632fe89d-7afe-4f8d-ac36-81fb51f63c5a",
                      name: "Project Name",
                      description: "Project Description",
                      parent: "Parent Project",
                      members: [],
                      leaders: [],
                      breadcrumbs: [],
                      progress: 0.5,
                      projects: [],
                      tasks: [
                        {
                          id: "632fe89d-7afe-4f8d-ac36-81fb51f63c5c",
                          name: "Task Name",
                          description: "Task Description",
                          assignee: {
                            name: "Assignee Name",
                          },
                          startDate: "2021-12-31",
                          dueDate: "2022-01-31",
                        },
                      ],
                    }),
                };
              }
            },
          },
        },
      ],
      imports: [HttpClientModule, OAuthModule.forRoot(), RouterModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await waitForProperty(() => component.project);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // CA1HU21: La aplicación debe mostrar la información actualizada de una tarea al hacer click en la misma en cualquier vista (tabla, kanban, calendario, roadmap)

  // H20T1: Previsualizar la información de una tarea al hacer click en la misma en la vista de tabla
  it("should show the task preview when a task is clicked in the table view", async () => {
    const tableComponent = fixture.debugElement.query(By.directive(TableComponent))
      .componentInstance as TableComponent;

    tableComponent.selectedTaskId = "632fe89d-7afe-4f8d-ac36-81fb51f63c5a";
    fixture.detectChanges();

    const taskPreview = fixture.debugElement.query(By.directive(TaskPreviewComponent));
    expect(taskPreview).toBeTruthy();
  });

  // CA2HU21: La aplicación debe permitir actualizar dentro del modal el status de tarea.

  // H20T5: Actualizar el status de una tarea desde el modal
  it("should update the status of a task from the modal", async () => {
    const tableComponent = fixture.debugElement.query(By.directive(TableComponent))
      .componentInstance as TableComponent;

    tableComponent.applyColumnWidths = () => {}

    tableComponent.selectedTaskId = "632fe89d-7afe-4f8d-ac36-81fb51f63c5a";
    fixture.detectChanges();

    const taskPreviewInfo = fixture.debugElement.query(By.directive(TaskPreviewInfoComponent)).componentInstance as TaskPreviewInfoComponent;

    taskPreviewInfo.updateStatus(1);
    fixture.detectChanges();

    expect(taskPreviewInfo.task?.status).toBe(1);
  });
});

  // H20T2: Previsualizar la información de una tarea al hacer click en la misma en la vista de kanban
  // it("should show the task preview when a task is clicked in the kanban view", async () => {
  //   const kanbanIcon = fixture.debugElement.query(By.directive(KanbanIconComponent));
  //   kanbanIcon.nativeElement.click();
  //   fixture.detectChanges();

  //   const kanbanComponent = fixture.debugElement.query(By.directive(KanbanSectionComponent))
  //     .componentInstance as KanbanSectionComponent;

  //   kanbanComponent.showTaskPreview("632fe89d-7afe-4f8d-ac36-81fb51f63c5a");
  //   fixture.detectChanges();

  //   const taskPreview = fixture.debugElement.query(By.directive(TaskPreviewComponent));
  //   expect(taskPreview).toBeTruthy();
  // });

  // H20T2: Previsualizar la información de una tarea al hacer click en la misma en la vista de calendario

  // H20T2: Previsualizar la información de una tarea al hacer click en la misma en la vista de roadmap
