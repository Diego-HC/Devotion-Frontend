import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSelectComponent} from './search-select.component';
import {StoreService} from "../../store.service";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";

// Autor: Andrea Badillo - A00833511

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;

  const assigneeToSearch = "Andrea Guadalupe Badillo Ibarra";
  const assigneeId = "c4c4d6d8-aeac-482b-9e15-4650b9be22f2";


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSelectComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: StoreService,
          useValue: {
            membersPool: [
              {
                id: "c4c4d6d8-aeac-482b-9e15-4650b9be22f2",
                name: "Andrea Guadalupe Badillo Ibarra",
                email: "a00833511@tec.mx",
                isLeader: true,
              },
            ],
            project: {
              members: [],
              leaders: [],
              assignee: {id: "", name: "", email: "", isLeader: false},
            },
          }
        },
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
    component.searchInput = assigneeToSearch;
    component.updateSuggestions(new KeyboardEvent('keyup'));
    expect(component.suggestions.length).toBe(1);
  });

  // • CA2H13 - Límite de selección: La cantidad de miembros que se pueden seleccionar son: [1, ∞]
  it('should allow selecting a member', () => {
    component.selectSuggestion({id: assigneeId, name: assigneeToSearch, email: "a00833511@tec.mx", isLeader: true});
    expect(component.selection()).toContain({
      id: assigneeId,
      name: assigneeToSearch,
      email: "a00833511@tec.mx",
      isLeader: true
    });
  });

  // should allow selecting more than one member
  it('should allow selecting more than one member', () => {
    component.selectSuggestion({id: assigneeId, name: assigneeToSearch, email: "a00833511@tec.mx", isLeader: true});
    component.selectSuggestion({
      id: "05d4349f-8466-4b11-a1eb-fc376421bf3a",
      name: "Leonardo Corona Garza",
      email: "a00832792@tec.mx",
      isLeader: false
    });
    expect(component.selection().length).toBe(2)
  });

  it('should alert the user if no leaders are selected', () => {

  });
});
