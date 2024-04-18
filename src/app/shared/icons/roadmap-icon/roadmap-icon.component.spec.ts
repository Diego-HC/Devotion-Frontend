import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapIconComponent } from './roadmap-icon.component';

describe('RoadmapIconComponent', () => {
  let component: RoadmapIconComponent;
  let fixture: ComponentFixture<RoadmapIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadmapIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
