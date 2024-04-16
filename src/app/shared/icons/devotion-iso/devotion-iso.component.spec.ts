import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevotionIsoComponent } from './devotion-iso.component';

describe('DevotionIsoComponent', () => {
  let component: DevotionIsoComponent;
  let fixture: ComponentFixture<DevotionIsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevotionIsoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevotionIsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
