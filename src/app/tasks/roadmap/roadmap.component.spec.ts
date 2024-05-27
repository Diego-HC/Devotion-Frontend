import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RoadmapComponent } from './roadmap.component';
import { ApiService } from '../../api.service';
describe('RoadmapComponent', () => {
  let component: RoadmapComponent;
  let fixture: ComponentFixture<RoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapComponent],
      providers: [ApiService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
