import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmGoBackComponent } from './confirm-go-back.component';
import { StoreService } from '../../store.service';
import { Router } from "@angular/router";

describe('ConfirmGoBackComponent', () => {
  let component: ConfirmGoBackComponent;
  let fixture: ComponentFixture<ConfirmGoBackComponent>;
  let router: Router;
  let storeService: StoreService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmGoBackComponent],
      imports: [RouterTestingModule],
      providers: [StoreService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmGoBackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storeService = TestBed.inject(StoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the confirmation message', () => {
    component.wannaGoBack = false;
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(message.textContent).toContain('¿Deseas volver? Los cambios hechos no serán guardados.');
  });

  it('should call handleGoBack when the back button is clicked', () => {
    spyOn(component, 'handleGoBack');
    const button = fixture.debugElement.query(By.css('.text-cardRed')).nativeElement;
    button.click();
    expect(component.handleGoBack).toHaveBeenCalled();
  });

  it('should call handleCancel when the cancel button is clicked', () => {
    spyOn(component, 'handleCancel');
    const button = fixture.debugElement.query(By.css('.text-devotionPrimary')).nativeElement;
    button.click();
    expect(component.handleCancel).toHaveBeenCalled();
  });
});
