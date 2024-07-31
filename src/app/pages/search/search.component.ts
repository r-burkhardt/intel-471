import { Component, effect, inject, OnChanges, OnInit } from '@angular/core';
import { FiltersStore } from '../../core/stores/filters.store';
import { MealDbStore } from '../../core/stores/meal-db.store';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeTileGridComponent } from '../../components/recipe-tile-grid/recipe-tile-grid.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { Filters } from '../../core/interfaces/filters.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    RecipeTileGridComponent,
    FiltersComponent
  ],
  providers: [FiltersStore, MealDbStore],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  private _route = inject(ActivatedRoute);

  private _filtersStore = inject(FiltersStore);

  private _mealStore = inject(MealDbStore);

  private _filterCategory = this._filtersStore.selectedCategory;

  vm = this._mealStore.vm;

  filters: Filters = {};

  displayLatest = false;

  ngOnInit() {
    const queryParams = this._route.snapshot.queryParams;
    this.search(queryParams);
  }

  search(queryParams: Record<string, any>) {
    if (Object.entries(queryParams).length === 0) return;
    if (Object.entries(queryParams).length > 1) {
      const { ingredients, ...rest } = queryParams;
      this.filters = { ...rest, ...(ingredients ? { ingredients: ingredients.toString().split(',') } : {}) };
    } else {
      const [[key, value]] = Object.entries(queryParams);
      if (key === 'category') {
        this._mealStore.getMealsByCategoryEffect(value.toString());
        this.filters = { category: value.toString() };
      } else if (key === 'area') {
        this._mealStore.getMealsByAreaEffect(value.toString());
        this.filters = { area: value.toString() };
      } else if (key === 'ingredient') {
        this._mealStore.getMealsByIngredientEffect(value.toString());
        this.filters = { ingredients: value.toString().split(',') };
      } else if (key === 'search') {
        this._mealStore.getMealsByNameEffect(value.toString());
        this.filters = { search: value.toString() };
      }
    }
  }

  filtersChanged() {
    const { category, area, ingredients, search } = this.filters || {};
    this.displayLatest = !category && !area && !ingredients && !search;
    if (this.displayLatest) {
      this._mealStore.getLatestMealsEffect();
      return;
    }
    this._mealStore.searchMealsEffect({ category, area, ingredients, search });
  }
}
