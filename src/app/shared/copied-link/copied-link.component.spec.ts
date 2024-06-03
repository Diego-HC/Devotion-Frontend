import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiedLinkComponent } from './copied-link.component';

describe('CopiedLinkComponent', () => {
  let component: CopiedLinkComponent;
  let fixture: ComponentFixture<CopiedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopiedLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopiedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
