import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsIconComponent } from './projects-icon.component';

describe('ProjectsIconComponent', () => {
  let component: ProjectsIconComponent;
  let fixture: ComponentFixture<ProjectsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
