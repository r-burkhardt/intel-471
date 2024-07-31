import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LandingComponent } from './landing.component';
import { MealDbStore } from '../../core/stores/meal-db.store';
import { FiltersStore } from '../../core/stores/filters.store';
import { of } from 'rxjs';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let mockMealDbStore: jasmine.SpyObj<MealDbStore>;
  let mockFiltersStore: jasmine.SpyObj<FiltersStore>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockMealDbStore = jasmine.createSpyObj('MealDbStore', ['getLatestMealsEffect'], { vm: of({}) });
    mockFiltersStore = jasmine.createSpyObj('FiltersStore', ['categories']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [
        { provide: MealDbStore, useValue: mockMealDbStore },
        { provide: FiltersStore, useValue: mockFiltersStore },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return categories from FiltersStore', () => {
    const categoriesMock = [{ id: '1', name: 'Category 1' }];
    mockFiltersStore.categories.and.returnValue(categoriesMock);
    expect(component.categories).toEqual(categoriesMock);
  });

  it('should navigate to search with query params', () => {
    component.searchText = 'test';
    component.search();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], { queryParams: { search: 'test' } });
  });
});
