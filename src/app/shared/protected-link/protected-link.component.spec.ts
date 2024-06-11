import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProtectedLinkComponent } from './protected-link.component';

describe('ProtectedLinkComponent', () => {
  let component: ProtectedLinkComponent;
  let fixture: ComponentFixture<ProtectedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectedLinkComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProtectedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
