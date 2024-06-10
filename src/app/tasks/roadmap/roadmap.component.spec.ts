import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RoadmapComponent } from './roadmap.component';
import { ApiService } from '../../api.service';
import { OAuthModule } from "angular-oauth2-oidc";
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';

describe('RoadmapComponent', () => {
  
  let component: RoadmapComponent;
  let fixture: ComponentFixture<RoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadmapComponent],
      imports: [HttpClientTestingModule, OAuthModule.forRoot()],
      providers: [ApiService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadmapComponent);
    component = fixture.componentInstance;

    const headerTable = document.createElement('table');
    const bodyTable = document.createElement('table');

    const bodyRow = bodyTable.insertRow();
    const bodyCell = bodyRow.insertCell();
    bodyCell.style.width = '100px'; 

    component.headerTable = { nativeElement: headerTable } as ElementRef;
    component.bodyTable = { nativeElement: bodyTable } as ElementRef;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply column widths', () => {
    spyOn(component, 'applyColumnWidths').and.callThrough();
    component.ngAfterViewInit();
    expect(component.applyColumnWidths).toHaveBeenCalled();
  });

  it('should format dates correctly', () => {
    const startDate = '2023-01-02';
    const endDate = '2023-01-02';
    const formattedDates = component.getFormattedDates(startDate, endDate);
    expect(formattedDates).toBe('1 Enero 2023');
  });
  
  it('should open and close task preview', () => {
    component.showTaskPreview('1');
    expect(component.selectedTaskId).toBe('1');
    component.closeTaskPreview();
    expect(component.selectedTaskId).toBeNull();
  });
  
  it('should open and close task preview', () => {
    component.showTaskPreview('1');
    expect(component.selectedTaskId).toBe('1');
    component.closeTaskPreview();
    expect(component.selectedTaskId).toBeNull();
  });
  
});
