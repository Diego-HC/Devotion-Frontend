import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectCardComponent } from './subproject-card.component';

describe('SubprojectCardComponent', () => {
  let component: SubprojectCardComponent;
  let fixture: ComponentFixture<SubprojectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubprojectCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubprojectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
