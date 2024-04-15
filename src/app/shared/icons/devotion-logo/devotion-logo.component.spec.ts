import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevotionLogoComponent } from './devotion-logo.component';

describe('DevotionLogoComponent', () => {
  let component: DevotionLogoComponent;
  let fixture: ComponentFixture<DevotionLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevotionLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevotionLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
