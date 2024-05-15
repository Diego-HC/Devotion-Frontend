import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftChevronIconComponent } from './left-chevron-icon.component';

describe('LeftChevronIconComponent', () => {
  let component: LeftChevronIconComponent;
  let fixture: ComponentFixture<LeftChevronIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftChevronIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftChevronIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
