import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmGoBackComponent } from './confirm-go-back.component';

describe('ConfirmGoBackComponent', () => {
  let component: ConfirmGoBackComponent;
  let fixture: ComponentFixture<ConfirmGoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmGoBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
