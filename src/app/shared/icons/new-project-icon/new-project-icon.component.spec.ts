import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectIconComponent } from './new-project-icon.component';

describe('NewProjectIconComponent', () => {
  let component: NewProjectIconComponent;
  let fixture: ComponentFixture<NewProjectIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProjectIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewProjectIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
