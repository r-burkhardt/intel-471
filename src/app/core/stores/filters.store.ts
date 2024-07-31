import { inject, Injectable } from '@angular/core';
import { MealDbService } from '../services/meal-db/meal-db.service';
import { Category } from '../interfaces/category.interface';
import { Ingredient } from '../interfaces/ingredient.interface';
import { ComponentStore } from '@ngrx/component-store';
import { CategoryDataObject } from '../interfaces/category-data-object.interface';
import { IngredientDataObject } from '../interfaces/ingredient-data-object.interface';
import { AreaDataObject } from '../interfaces/area-data-object.interface';

interface FiltersState {
  areas: string[];
  categories: Category[];
  ingredients: Ingredient[];
  selectedArea: string;
  selectedCategory: string;
  selectedIngredients: string[];
}

@Injectable()
export class FiltersStore extends ComponentStore<FiltersState> {
  private _mealDB = inject(MealDbService);

  areas = this.selectSignal(state => state.areas);
  categories = this.selectSignal(state => state.categories);
  ingredients = this.selectSignal(state => state.ingredients);
  selectedCategory = this.selectSignal(state => state.selectedCategory);
  selectedArea = this.selectSignal(state => state.selectedArea);
  selectedIngredients = this.selectSignal(state => state.selectedIngredients);

  vm = this.selectSignal(
    this.areas,
    this.categories,
    this.ingredients,
    this.selectedCategory,
    this.selectedArea,
    this.selectedIngredients,
    (areas, categories, ingredients, selectedCategory, selectedArea, selectedIngredients) => ({
      areas,
      categories,
      ingredients,
      selectedCategory,
      selectedArea,
      selectedIngredients
    }));

  setSelectedCategory = this.updater((state, category: string) => ({ ...state, selectedCategory: category }));

  setSelectedArea = this.updater((state, area: string) => ({ ...state, selectedArea: area }));

  setSelectedIngredients = this.updater((state, ingredients: string[]) => ({ ...state, selectedIngredients: ingredients }));

  private _getAreas() {
    this._mealDB.getAreas()
      .subscribe(areas => this.patchState({ areas: this.cleanAreas(areas) }));
  }

  private _getCategories() {
    this._mealDB.getCategories()
      .subscribe(categories => this.patchState({ categories: this.cleanCategories(categories) }));
  }

  private _getIngredients() {
    this._mealDB.getIngredients()
      .subscribe(ingredients => this.patchState({ ingredients: this.cleanIngredients(ingredients) }));
  }

  constructor() {
    super({
      areas: [],
      categories: [],
      ingredients: [],
      selectedArea: '',
      selectedCategory: '',
      selectedIngredients: []
    });
    this._getAreas();
    this._getCategories();
    this._getIngredients();
  }

  private cleanCategories(categories: CategoryDataObject[]): Category[] {
    return (categories || []).map(category => {
      return {
        id: +category.strCategory,
        category: category.strCategory,
        description: category.strCategoryDescription,
        thumbnail: category.strCategoryThumb
      };
    });
  }

  private cleanIngredients(ingredients: IngredientDataObject[]): Ingredient[] {
    return (ingredients || []).map(ingredient => {
      return {
        id: +ingredient.idIngredient,
        ingredient: ingredient.strIngredient,
        description: ingredient.strDescription,
        type: ingredient.strType
      };
    });
  }

  private cleanAreas(areas: AreaDataObject[]): string[] {
    return (areas || []).map(area => area.strArea);
  }
}
