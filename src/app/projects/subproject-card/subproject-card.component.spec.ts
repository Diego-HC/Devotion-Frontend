import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectCardComponent } from './subproject-card.component';


describe('SubprojectCardComponent', () => {
  let component: SubprojectCardComponent;
  let fixture: ComponentFixture<SubprojectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubprojectCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
