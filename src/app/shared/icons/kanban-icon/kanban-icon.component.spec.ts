import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanIconComponent } from './kanban-icon.component';

describe('KanbanIconComponent', () => {
  let component: KanbanIconComponent;
  let fixture: ComponentFixture<KanbanIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbanIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
