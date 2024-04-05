import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectsComponent } from './subprojects.component';

describe('SubprojectsComponent', () => {
  let component: SubprojectsComponent;
  let fixture: ComponentFixture<SubprojectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubprojectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
