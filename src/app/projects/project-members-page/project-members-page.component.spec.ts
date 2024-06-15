import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectMembersPageComponent } from './project-members-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from "../../store.service";
import  { of } from 'rxjs';

// Autor: Andrea Guadalupe Badillo Ibarra - A00833511

describe('ProjectMembersPageComponent', () => {
  let component: ProjectMembersPageComponent;
  let fixture: ComponentFixture<ProjectMembersPageComponent>;

  const mockStoreService = {
    pageWasReloaded: false,
    project: {
      leaders: [
        {
          id: "c4c4d6d8-aeac-482b-9e15-4650b9be22f3",
          name: "Andrea Badillo",
          email: "a00833511@tec.mx",
          isLeader: true,
        }
      ],
      members: [ {
        id: "c4c4d6d8-aeac-482b-9e15-4650b9be22f2",
        name: "Leonardo DiCaprio",
        email: "dicaprio@salad.com",
        isLeader: false,
      },
      {
        id: "c4c4d6d8-aeac-482b-9e15-4650b9be22f3",
        name: "Sergio Perez",
        email: "sergio@salad.com",
        isLeader: false,
      }
    ]
    }
  }

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          return "c4c4d6d8-aeac-482b-9e15-4650b9be22f2";
        }
      }
    },
    params: of({ id: "c4c4d6d8-aeac-482b-9e15-4650b9be22f2" })
  }

  const mockRouter = {
    navigate: jasmine.createSpy('navigateByUrl')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectMembersPageComponent],
      providers: [
        {
          provide: StoreService,
          useValue: mockStoreService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMembersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // H21T1 - Abrir lista de miembros
  it('should show all members', () => {
    expect(component.filteredMembers.length).toBe(3);
  });

  // H21T3 - Filtrar miembros por rol de líder
  it('should show leaders role', () => {
    const leaders = component.filteredMembers.filter(member => member.isLeader);
    expect(leaders.length).toBe(1);
  });

  // H21T4 - Filtrar miembros por rol
  it('should show just members role', () => {
    const members = component.filteredMembers.filter(member => !member.isLeader);
    expect(members.length).toBe(2);
  });

  // H21T5 - Filtrar miembros por nombre
  it('should filter members by name', () => {
    component.searchQuery = "Sergio Perez";
    component.onRoleChange();
    expect(component.filteredMembers.length).toBe(1);
  })
});
