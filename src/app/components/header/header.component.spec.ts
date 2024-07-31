import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['events', 'url']);
    mockRouter.events = of(new NavigationEnd(0, '/', '/'));
    mockRouter.url = '/';

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isHidden based on router URL', () => {
    expect(component.isHidden).toBeTrue();

    mockRouter.url = '/other';
    mockRouter.events = of(new NavigationEnd(0, '/other', '/other'));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isHidden).toBeFalse();
  });
});
