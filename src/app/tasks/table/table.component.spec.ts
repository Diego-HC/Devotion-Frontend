import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableComponent } from './table.component';
import { ApiService } from '../../api.service';
import { StoreService } from '../../store.service';
import { AuthGoogleService } from '../../auth-google.service';
import { OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider } from 'angular-oauth2-oidc';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TableComponent],
      providers: [ApiService, 
        StoreService,
        StoreService,
        AuthGoogleService,
        OAuthService,
        UrlHelperService,
        OAuthLogger,
        DateTimeProvider
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
