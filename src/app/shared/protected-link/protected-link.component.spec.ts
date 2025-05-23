import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProtectedLinkComponent } from './protected-link.component';
import { By } from '@angular/platform-browser';

describe('ProtectedLinkComponent', () => {
  let component: ProtectedLinkComponent;
  let fixture: ComponentFixture<ProtectedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectedLinkComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProtectedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link element', () => {
    const linkElement = fixture.debugElement.query(By.css('a'));
    expect(linkElement).toBeTruthy();
  });

  it('should render the content in a protected link', () => {
    component.href = '/test-link';
    fixture.detectChanges();
    const content = 'Test Content';
    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    linkElement.innerHTML = content;
    fixture.detectChanges();
    expect(linkElement.textContent).toContain(content);
  });

});
