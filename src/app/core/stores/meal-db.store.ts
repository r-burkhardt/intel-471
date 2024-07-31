import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MealDbService } from '../services/meal-db/meal-db.service';
import { Meal } from '../models/meal';
import { catchError, forkJoin, Observable, switchMap, tap } from 'rxjs';
import { Filters } from '../interfaces/filters.interface';
import { MealDataObject } from '../interfaces/meal-data-object.interface';
import { query } from '@angular/animations';

interface MealState {
  meals: Meal[];
  latestMeals: Meal[];
  selectedMeal: Meal|null;
  perPage: number;
}

@Injectable()
export class MealDbStore extends ComponentStore<MealState> {
  private _mealDB = inject(MealDbService);

  meals = this.selectSignal(state => state.meals);
  latestMeals = this.selectSignal(state => state.latestMeals);
  selectedMeal = this.selectSignal(state => state.selectedMeal);
  perPage = this.selectSignal(state => state.perPage);

  vm = this.selectSignal(
    this.meals,
    this.latestMeals,
    this.selectedMeal,
    this.perPage,
    ( meals, latestMeals, selectedMeal, perPage) => ({
      meals,
      latestMeals,
      selectedMeal,
      perPage
    })
  );

  getLatestMealsEffect = this.effect((trigger$: Observable<undefined>) =>
    trigger$.pipe(
      switchMap(() => this._mealDB.getLatestMeals().pipe(catchError(() => []))),
      tap(latestMeals => {
        this.patchState({ latestMeals: latestMeals.map(meal => new Meal(meal)) });
      })
    )
  );

  getMealsByCategoryEffect = this.effect((category$: Observable<string>) =>
    category$.pipe(
      switchMap(category => this._mealDB.getMealsByCategory(category).pipe(catchError(() => []))),
      tap(meals => {
        this.patchState({ meals: meals.map(meal => new Meal(meal)) });
      })
    )
  );

  getMealsByAreaEffect = this.effect((area$: Observable<string>) =>
    area$.pipe(
      switchMap(area => this._mealDB.getMealsByArea(area).pipe(catchError(() => []))),
      tap(meals => {
        this.patchState({ meals: meals.map(meal => new Meal(meal)) });
      })
    )
  );

  getMealsByIngredientEffect = this.effect((ingredient$: Observable<string|string[]>) =>
    ingredient$.pipe(
      switchMap(ingredient => this._mealDB.getMealsByIngredient(ingredient).pipe(catchError(() => []))),
      tap(meals => {
        this.patchState({ meals: (meals || []).map(meal => new Meal(meal)) });
      })
    )
  );

  getMealByIdEffect = this.effect((id$: Observable<number>) =>
    id$.pipe(
      switchMap(id => this._mealDB.getMealById(id.toString()).pipe(catchError(() => []))),
      tap(meals => {
        const [meal] = meals || [];
        this.patchState({ selectedMeal: meal ? new Meal(meal) : null });
      })
    )
  );

  getMealsByNameEffect = this.effect((name$: Observable<string>) =>
    name$.pipe(
      switchMap(name => this._mealDB.getMealByName(name).pipe(catchError(() => []))),
      tap(meals => {
        this.patchState({ meals: (meals || []).map(meal => new Meal(meal)) });
      })
    )
  );

  getMealsByFirstLetterEffect = this.effect((letter$: Observable<string>) =>
    letter$.pipe(
      switchMap(letter => this._mealDB.getMealsByFirstLetter(letter).pipe(catchError(() => []))),
      tap(meals => {
        this.patchState({ meals: (meals || []).map(meal => new Meal(meal)) });
      })
    )
  );

  getRandomMealEffect = this.effect((multi$: Observable<boolean|undefined>) =>
    multi$.pipe(
      switchMap(multi => this._mealDB.getRandomMeal(multi).pipe(catchError(() => []))),
      tap(meals => {
        this.patchState({ meals: (meals || []).map(meal => new Meal(meal)) });
      })
    )
  );

  searchMealsEffect = this.effect((query$: Observable<Filters>) =>
    query$.pipe(
      switchMap(query =>
        forkJoin([
          ...(query.search ? [this._mealDB.getMealByName(query.search || '')] : []),
          ...(query.category ? [this._mealDB.getMealsByCategory(query.category || '')] : []),
          ...(query.area ? [this._mealDB.getMealsByArea(query.area || '')] : []),
          ...(query.ingredients?.length ? [this._mealDB.getMealsByIngredient(query.ingredients || '')] : [])
        ])
      ),
      tap(meals => {
        console.log(meals);
        const intersectingMeals = this._getIntersectingMeals(meals as MealDataObject[][]);
        this.patchState({ meals: (intersectingMeals).map(meal => new Meal(meal)) });
      })
    )
  );

  constructor() {
    super({ meals: [], latestMeals: [], selectedMeal: null, perPage: 10 });
  }

  private _getIntersectingMeals(data: MealDataObject[][]): MealDataObject[] {
    if (data.length === 0) return [];
    if (data.length === 1) return data[0];
    const [smallest, ...others] = data.sort((a, b) => a.length - b.length);
    return smallest.filter(meal => others.every(other => other.some(m => m.idMeal === meal.idMeal)));
  }
}
