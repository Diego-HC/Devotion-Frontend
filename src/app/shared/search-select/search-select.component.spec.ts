import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSelectComponent} from './search-select.component';
import {StoreService} from "../../store.service";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

// Autor: Andrea Badillo - A00833511

// Autor: Andrea Guadalupe Badillo Ibarra - A00833511

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;

  const assigneeToSearch = "Andrea Guadalupe Badillo Ibarra";
  const assigneeId = "c4c4d6d8-aeac-482b-9e15-4650b9be22f2";

  const mockStoreService = {
    userPool: [
      {
        id: assigneeId,
        name: assigneeToSearch,
        email: "a00833511@tec.mx",
        isLeader: true,
      },
      {
        id: "05d4349f-8466-4b11-a1eb-fc376421bf3a",
        name: "Leonardo Corona Garza",
        email: "a00832792@tec.mx",
        isLeader: false,
      },
      {
        id: "b3045125-c471-4c40-bcc3-6ec1ca9edc9f",
        name: "Alexa Ramirez",
        email: "a00832344@tec.mx",
        isLeader: true,
      },
      {
        id: "b3045125-c471-4c40-bcc3-6ec1ca9edc9f",
        name: "Scarlet Soto",
        email: "a12082482@tec.mx",
        isLeader: false,
      }
    ],
    project: {
      members: [],
      leaders: [],
      assignee: {id: "", name: "", email: "", isLeader: false},
    },
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSelectComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: StoreService,
          useValue: mockStoreService,
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // • CA1H13 - Personas disponibles: Al momento de dar click en el campo para seleccionar líderes o miembros, debe permitirte escribir y autocompletar la búsqueda.
  it('should show suggestions when input is focused', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input[type="search"]'));
    inputDebugElement.triggerEventHandler('focusin', null);
    fixture.detectChanges();
    expect(component.showSuggestions).toBe(true);
  });

  // • CA2H13 - Límite de selección: La cantidad de miembros que se pueden seleccionar son: [1, ∞]
  it('should allow selecting a member', () => {
    component.selectSuggestion(mockStoreService.userPool[0]);
    expect(component.selection()).toContain({
      id: assigneeId,
      name: assigneeToSearch,
      email: "a00833511@tec.mx",
      isLeader: true
    });
  });

  // should allow selecting more than one member
  it('should allow selecting more than one member', () => {
    component.selectSuggestion(mockStoreService.userPool[1]);
    expect(component.selection()).toContain({
      id: "05d4349f-8466-4b11-a1eb-fc376421bf3a",
      name: "Leonardo Corona Garza",
      email: "a00832792@tec.mx",
      isLeader: false,
    })
    component.selectSuggestion(mockStoreService.userPool[3]);
    expect(component.selection()).toContain({
      id: "b3045125-c471-4c40-bcc3-6ec1ca9edc9f",
      name: "Scarlet Soto",
      email: "a12082482@tec.mx",
      isLeader: false,
    })
  });

  it('should allow selecting more than one leader', () => {
    component.selectSuggestion(mockStoreService.userPool[0]);
    expect(component.selection()).toContain({
      id: assigneeId,
      name: assigneeToSearch,
      email: "a00833511@tec.mx",
      isLeader: true,
    })
    component.selectSuggestion(mockStoreService.userPool[2]);
    expect(component.selection()).toContain({
      id: "b3045125-c471-4c40-bcc3-6ec1ca9edc9f",
      name: "Alexa Ramirez",
      email: "a00832344@tec.mx",
      isLeader: true,
    })
  });

  it('should allow deselecting a member', () => {
    component.selectSuggestion(mockStoreService.userPool[1]);
    component.deselectMember(mockStoreService.userPool[1]);
    expect(component.selection()).not.toContain(mockStoreService.userPool[1]);
  });

  it('should allow deselecting a leader', () => {
    component.selectSuggestion(mockStoreService.userPool[0]);
    component.deselectMember(mockStoreService.userPool[0]);
    expect(component.selection()).not.toContain(mockStoreService.userPool[0]);
  });

  it('should alert the user if no leaders are selected', () => {
    spyOn(window, 'alert');
    component.store.project.leaders = [];
    component.checkLeaders();
    expect(window.alert).toHaveBeenCalledWith('Es necesario agregar líderes');
  });
});
