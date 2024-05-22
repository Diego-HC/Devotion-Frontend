import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateEditPageComponent } from "./create-edit-page.component";
import { HttpClientModule } from "@angular/common/http";
import { OAuthModule } from "angular-oauth2-oidc";
import { Router } from "@angular/router";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";

describe("CreateEditPageComponent", () => {
  let component: CreateEditPageComponent;
  let fixture: ComponentFixture<CreateEditPageComponent>;

  const projectId = "64b6f1b0-0b1b-4b3b-8b3b-3b3b3b3b3b3b";
  let mockRouter = {
    navigateByUrl: jasmine.createSpy("navigateByUrl"),
  };
  const mockStoreService = {
    project: {
      id: "",
      name: "",
      description: "",
      parent: "",
      leaders: [],
      members: [],
    } as Project,
    pageWasReloaded: false,
    membersPool: [],
    projectRequestBody: () => {
      return {
        id: projectId,
        name: "Project Name",
        description: "Project Description",
      };
    },
  };

  const resetStore = () => {
    mockStoreService.project = {
      id: "",
      name: "",
      description: "",
      parent: "",
      leaders: [],
      members: [],
    };
    mockStoreService.pageWasReloaded = false;
    mockStoreService.membersPool = [];
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditPageComponent],
      imports: [HttpClientModule, OAuthModule.forRoot()],
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ApiService,
          useValue: {
            get: (url: string) => {
              return {
                subscribe: () => {
                  return [];
                },
              };
            },
            post: (url: string, data: any) => {
              return {
                subscribe: (fn: (value: any) => void) => {
                  fn({
                    id: projectId,
                    name: "Project Name",
                    description: "Project Description",
                  });
                },
              };
            },
          },
        },
        {
          provide: StoreService,
          useValue: mockStoreService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    resetStore();
  });

  afterEach(() => {
    resetStore();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // H2T1 - Descripción: El usuario crea un proyecto exitosamente (happy path).
  // Diego Hernández
  it("should create a project and redirect the user to the project start page", () => {
    component.projectForm.controls["name"].setValue("Project Name");
    component.projectForm.controls["description"].setValue(
      "Project Description"
    );
    mockStoreService.project.leaders = [
      { id: "1", name: "User 1", email: "ola@ola.com", isLeader: true },
    ];
    mockStoreService.project.members = [
      { id: "1", name: "User 1", email: "ola@ola.com", isLeader: false },
    ];

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
      `/project/${projectId}`
    );
  });

  // H2T2 - Descripción: El sistema no da de alta un proyecto sin nombre, descripción ni líderes
  // Diego Hernández
  it("should not create a project without a name, description, or leaders", () => {
    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(component.projectForm.valid).toBeFalse();
  });

  // H2T3 - Descripción: El sistema da de alta un proyecto sin miembros del proyecto
  // Diego Hernández
  it("should create a project without project members", () => {
    component.projectForm.controls["name"].setValue("Project Name");
    component.projectForm.controls["description"].setValue(
      "Project Description"
    );
    mockStoreService.project.leaders = [
      { id: "1", name: "User 1", email: "ola@ola.com", isLeader: true },
    ];

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
      `/project/${projectId}`
    );
  });
});
