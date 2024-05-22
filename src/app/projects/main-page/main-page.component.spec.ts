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
        TableComponent
      ],
      providers: [
        {
          provide: ApiService,
          useValue: {
            // return an observable that emits a response
            get: (id: string) => {
              return {
                subscribe: (fn: (value: any) => void) => {
                  fn({
                    id,
                    name: "Project Name",
                    description: "Project Description",
                    parent: "Parent Project",
                    members: [],
                    leaders: [],
                    breadcrumbs: [],
                    progress: 0.5,
                    projects: [],
                    tasks: [],
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

  // •CA1H2 - Visualización: Desde la vista del proyecto principal, debe aparecer un botón para agregar un subproyecto
  // Diego Hernandez
  it("should have a button to add a subproject", () => {
    const button = fixture.debugElement.query(By.css("#newSubprojectButton"));
    expect(button).toBeTruthy();
  });
});
