import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { FiltersStore } from '../../core/stores/filters.store';
import { Ingredient } from '../../core/interfaces/ingredient.interface';
import { Filters } from '../../core/interfaces/filters.interface';
import { of } from 'rxjs';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let mockFiltersStore: jasmine.SpyObj<FiltersStore>;

  beforeEach(async () => {
    mockFiltersStore = jasmine.createSpyObj('FiltersStore', ['ingredients', 'selectedCategory', 'selectedArea', 'setSelectedIngredients', 'setSelectedArea', 'setSelectedCategory', 'vm']);
    mockFiltersStore.ingredients.and.returnValue(of([{ id: '1', ingredient: 'Ingredient 1' }, { id: '2', ingredient: 'Ingredient 2' }]));
    mockFiltersStore.selectedCategory.and.returnValue('');
    mockFiltersStore.selectedArea.and.returnValue('');
    mockFiltersStore.vm.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [FiltersComponent],
      providers: [{ provide: FiltersStore, useValue: mockFiltersStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filters input property correctly', () => {
    const filters: Filters = { category: 'Test Category', area: 'Test Area', ingredients: ['Ingredient 1'] };
    component.filters = filters;
    component.ngOnChanges({ filters: { currentValue: filters, previousValue: {}, firstChange: true, isFirstChange: () => true } });
    expect(component.selectedCategory).toBe('Test Category');
    expect(component.selectedArea).toBe('Test Area');
    expect(component.selectedIngredients).toEqual([{ id: '1', ingredient: 'Ingredient 1' }]);
  });

  it('should search ingredients correctly', () => {
    component.searchInput = 'Ingredient 1';
    component.searchIngredients({ target: { value: 'Ingredient 1' } } as Event);
    expect(component.searchedIngredients).toEqual([{ id: '1', ingredient: 'Ingredient 1' }]);
  });

  it('should select ingredient correctly', () => {
    const ingredient: Ingredient = { id: '1', ingredient: 'Ingredient 1' };
    component.onSelectIngredient(ingredient);
    expect(component.selectedIngredients).toContain(ingredient);
    expect(component.filteredIngredients).not.toContain(ingredient);
  });

  it('should unselect ingredient correctly', () => {
    const ingredient: Ingredient = { id: '1', ingredient: 'Ingredient 1' };
    component.selectedIngredients = [ingredient];
    component.onUnselectIngredient(ingredient);
    expect(component.selectedIngredients).not.toContain(ingredient);
    expect(component.filteredIngredients).toContain(ingredient);
  });

  it('should select area correctly', () => {
    const event = { target: { value: 'Test Area' } } as Event;
    component.onSelectArea(event);
    expect(component.selectedArea).toBe('Test Area');
  });

  it('should select category correctly', () => {
    const event = { target: { value: 'Test Category' } } as Event;
    component.onSelectCategory(event);
    expect(component.selectedCategory).toBe('Test Category');
  });

  it('should clear filters correctly', () => {
    component.selectedCategory = 'Test Category';
    component.selectedArea = 'Test Area';
    component.selectedIngredients = [{ id: '1', ingredient: 'Ingredient 1' }];
    component.clearFilters();
    expect(component.selectedCategory).toBe('');
    expect(component.selectedArea).toBe('');
    expect(component.selectedIngredients).toEqual([]);
  });
});
