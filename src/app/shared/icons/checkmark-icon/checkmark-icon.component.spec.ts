import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmarkIconComponent } from './checkmark-icon.component';

describe('CheckmarkIconComponent', () => {
  let component: CheckmarkIconComponent;
  let fixture: ComponentFixture<CheckmarkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckmarkIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckmarkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
