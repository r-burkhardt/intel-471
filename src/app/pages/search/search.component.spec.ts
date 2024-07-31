import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from './search.component';
import { MealDbStore } from '../../core/stores/meal-db.store';
import { FiltersStore } from '../../core/stores/filters.store';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockMealDbStore: jasmine.SpyObj<MealDbStore>;
  let mockFiltersStore: jasmine.SpyObj<FiltersStore>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockMealDbStore = jasmine.createSpyObj('MealDbStore', [
      'getMealsByCategoryEffect',
      'getMealsByAreaEffect',
      'getMealsByIngredientEffect',
      'getMealsByNameEffect',
      'getLatestMealsEffect',
      'searchMealsEffect'
    ], { vm: of({}) });

    mockFiltersStore = jasmine.createSpyObj('FiltersStore', ['selectedCategory']);

    mockActivatedRoute = {
      snapshot: {
        queryParams: {}
      }
    };

    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        { provide: MealDbStore, useValue: mockMealDbStore },
        { provide: FiltersStore, useValue: mockFiltersStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMealsByCategoryEffect when category query param is present', () => {
    mockActivatedRoute.snapshot.queryParams = { category: 'test-category' };
    component.ngOnInit();
    expect(mockMealDbStore.getMealsByCategoryEffect).toHaveBeenCalledWith('test-category');
  });

  it('should call getMealsByAreaEffect when area query param is present', () => {
    mockActivatedRoute.snapshot.queryParams = { area: 'test-area' };
    component.ngOnInit();
    expect(mockMealDbStore.getMealsByAreaEffect).toHaveBeenCalledWith('test-area');
  });

  it('should call getMealsByIngredientEffect when ingredient query param is present', () => {
    mockActivatedRoute.snapshot.queryParams = { ingredient: 'test-ingredient' };
    component.ngOnInit();
    expect(mockMealDbStore.getMealsByIngredientEffect).toHaveBeenCalledWith('test-ingredient');
  });

  it('should call getMealsByNameEffect when search query param is present', () => {
    mockActivatedRoute.snapshot.queryParams = { search: 'test-search' };
    component.ngOnInit();
    expect(mockMealDbStore.getMealsByNameEffect).toHaveBeenCalledWith('test-search');
  });

  it('should call getLatestMealsEffect when no filters are set', () => {
    component.filters = {};
    component.filtersChanged();
    expect(component.displayLatest).toBeTrue();
    expect(mockMealDbStore.getLatestMealsEffect).toHaveBeenCalled();
  });

  it('should call searchMealsEffect with correct filters', () => {
    component.filters = { category: 'test-category', area: 'test-area', ingredients: ['test-ingredient'], search: 'test-search' };
    component.filtersChanged();
    expect(component.displayLatest).toBeFalse();
    expect(mockMealDbStore.searchMealsEffect).toHaveBeenCalledWith({
      category: 'test-category',
      area: 'test-area',
      ingredients: ['test-ingredient'],
      search: 'test-search'
    });
  });
});
