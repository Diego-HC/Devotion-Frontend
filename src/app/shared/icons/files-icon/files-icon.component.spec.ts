import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesIconComponent } from './files-icon.component';

describe('FilesIconComponent', () => {
  let component: FilesIconComponent;
  let fixture: ComponentFixture<FilesIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
