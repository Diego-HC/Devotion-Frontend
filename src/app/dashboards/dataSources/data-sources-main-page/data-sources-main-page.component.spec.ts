import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourcesMainPageComponent } from './data-sources-main-page.component';

describe('DataSourcesMainPageComponent', () => {
  let component: DataSourcesMainPageComponent;
  let fixture: ComponentFixture<DataSourcesMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSourcesMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSourcesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
