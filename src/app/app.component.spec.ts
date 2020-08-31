import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { State } from './store/reducers/auth.reducers';
import { AuthService } from './services/implementations/auth.service';
import { AuthServiceMock } from './mockers/auth.service-mock';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;

  beforeEach(async(() => {
    const initialState: State = {
      isAuthenticated: false,
      user: null,
      errorMessageLogin: null,
      canCloseLoginView: null,
      errorMessageSignUp: null,
      canCloseSignUpView: null
    };
    
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ], providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        provideMockStore({ initialState })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check if user is logged in on component Init', () => {
    spyOn(mockStore, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

});
