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
  let mockRouter = {
    navigateByUrl: jasmine.createSpy("navigateByUrl"),
  };
  const projectId = "64b6f1b0-0b1b-4b3b-8b3b-3b3b3b3b3b3b";

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
          useValue: {
            project: {
              id: "",
              name: "",
              description: "",
              parent: "",
              leaders: ["Member 1", "Member 2"],
              members: ["Member 1", "Member 2"],
            },
            pageWasReloaded: false,
            membersPool: [],
            projectPostBody: () => {
              return {
                id: projectId,
                name: "Project Name",
                description: "Project Description",
              };
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // •CA2H2 - Descripción: El sistema da de alta un proyecto cuando este cuente con nombre, descripción, líderes y miembros del subproyecto.
  // Diego Hernández
  it("should verify that the name, description, leaders and members have values before creating a project", () => {
    component.projectForm.controls["name"].setValue("Project Name");
    component.projectForm.controls["description"].setValue(
      "Project Description"
    );
    component.projectForm.controls["leaders"].setValue([
      "Leader 1",
      "Leader 2",
    ]);
    component.projectForm.controls["members"].setValue([
      "Member 1",
      "Member 2",
    ]);
    expect(component.projectForm.valid).toBeTruthy();
  });

  // • CA4H2 - Proyecto publicado: Cuando el usuario termine de completar su información, se le redirigirá a la pantalla de inicio del subproyecto.
  // Diego Hernández
  it("should redirect to the subproject start page after form submission", () => {
    component.projectForm.controls["name"].setValue("Project Name");
    component.projectForm.controls["description"].setValue(
      "Project Description"
    );

    spyOn(component, "onSubmit").and.callThrough();
    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(
      `/project/${projectId}`
    );
  });
});
