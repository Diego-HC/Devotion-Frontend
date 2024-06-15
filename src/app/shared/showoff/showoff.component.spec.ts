import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowoffComponent } from './showoff.component';

describe('ShowoffComponent', () => {
  let component: ShowoffComponent;
  let fixture: ComponentFixture<ShowoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowoffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
