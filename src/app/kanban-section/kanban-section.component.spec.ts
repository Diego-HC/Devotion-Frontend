import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanSectionComponent } from './kanban-section.component';

describe('KanbanSectionComponent', () => {
  let component: KanbanSectionComponent;
  let fixture: ComponentFixture<KanbanSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
