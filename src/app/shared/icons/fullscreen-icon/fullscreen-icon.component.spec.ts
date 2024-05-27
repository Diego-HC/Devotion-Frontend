import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenIconComponent } from './fullscreen-icon.component';

describe('FullscreenIconComponent', () => {
  let component: FullscreenIconComponent;
  let fixture: ComponentFixture<FullscreenIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullscreenIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullscreenIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
