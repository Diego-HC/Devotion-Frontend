import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSelectComponent} from './search-select.component';
import {StoreService} from "../../store.service";

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;
  const assigneeToSearch = "Andrea Guadalupe Badillo Ibarra";
  const assigneeId = "c4c4d6d8-aeac-482b-9e15-4650b9be22f2";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSelectComponent],
      providers: [
        {
          provide: StoreService,
          useValue: {
            membersPool: [
              {
                name: "Andrea Guadalupe Badillo Ibarra",
                email: "A00833511@tec.mx",
                isLeader: true,
              },
            ],
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
  // it('should allow selecting a member', () => {
  //   component.selectSuggestion({name: assigneeId});
  //   expect(component.selection()).toContain({name: assigneeToSearch});
  // });
});
