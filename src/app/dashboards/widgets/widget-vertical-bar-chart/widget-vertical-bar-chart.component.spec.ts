import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetVerticalBarChartComponent } from './widget-vertical-bar-chart.component';

describe('WidgetVerticalBarChartComponent', () => {
  let component: WidgetVerticalBarChartComponent;
  let fixture: ComponentFixture<WidgetVerticalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetVerticalBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetVerticalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
