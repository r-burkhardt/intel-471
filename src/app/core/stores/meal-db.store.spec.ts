import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FiltersStore } from './filters.store';
import { MealDbService } from '../services/meal-db/meal-db.service';

describe('FiltersStore', () => {
  let store: FiltersStore;
  let mockMealDbService: jasmine.SpyObj<MealDbService>;

  beforeEach(() => {
    mockMealDbService = jasmine.createSpyObj('MealDbService', ['getAreas', 'getCategories', 'getIngredients']);
    mockMealDbService.getAreas.and.returnValue(of([{ strArea: 'Area 1' }]));
    mockMealDbService.getCategories.and.returnValue(of([{ strCategory: 'Category 1', strCategoryDescription: 'Description 1', strCategoryThumb: 'Thumb 1' }]));
    mockMealDbService.getIngredients.and.returnValue(of([{ idIngredient: '1', strIngredient: 'Ingredient 1', strDescription: 'Description 1', strType: 'Type 1' }]));

    TestBed.configureTestingModule({
      providers: [
        FiltersStore,
        { provide: MealDbService, useValue: mockMealDbService }
      ]
    });

    store = TestBed.inject(FiltersStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should set selected category correctly', () => {
    store.setSelectedCategory('Test Category');
    expect(store.selectedCategory()).toBe('Test Category');
  });

  it('should set selected area correctly', () => {
    store.setSelectedArea('Test Area');
    expect(store.selectedArea()).toBe('Test Area');
  });

  it('should set selected ingredients correctly', () => {
    store.setSelectedIngredients(['Ingredient 1', 'Ingredient 2']);
    expect(store.selectedIngredients()).toEqual(['Ingredient 1', 'Ingredient 2']);
  });

  it('should get areas and update state correctly', () => {
    store['_getAreas']();
    expect(store.areas()).toEqual(['Area 1']);
  });

  it('should get categories and update state correctly', () => {
    store['_getCategories']();
    expect(store.categories()).toEqual([{
      id: 1,
      category: 'Category 1',
      description: 'Description 1',
      thumbnail: 'Thumb 1'
    }]);
  });

  it('should get ingredients and update state correctly', () => {
    store['_getIngredients']();
    expect(store.ingredients()).toEqual([{
      id: 1,
      ingredient: 'Ingredient 1',
      description: 'Description 1',
      type: 'Type 1'
    }]);
  });
});
