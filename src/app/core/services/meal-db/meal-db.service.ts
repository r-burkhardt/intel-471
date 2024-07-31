import { inject, Injectable } from '@angular/core';
import { HttpConnectorService } from '../http-connector/http-connector.service';
import { map, Observable } from 'rxjs';
import { MealDataObject } from '../../interfaces/meal-data-object.interface';
import { CategoryDataObject } from '../../interfaces/category-data-object.interface';
import { AreaDataObject } from '../../interfaces/area-data-object.interface';
import { IngredientDataObject } from '../../interfaces/ingredient-data-object.interface';

@Injectable({
  providedIn: 'root'
})
export class MealDbService {
  private _http = inject(HttpConnectorService);
  readonly MEAL_DB_API = 'https://www.themealdb.com/api/json/v2/9973533/';

  getCategories(): Observable<CategoryDataObject[]> {
    return this._http.get(`${this.MEAL_DB_API}categories.php`)
      .pipe(map((data: Record<string, any>) => data['categories']));
  }

  getAreas(): Observable<AreaDataObject[]> {
    return this._http.get(`${this.MEAL_DB_API}list.php?a=list`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getIngredients(): Observable<IngredientDataObject[]> {
    return this._http.get(`${this.MEAL_DB_API}list.php?i=list`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getMealsByCategory(category: string): Observable<MealDataObject[]> {
    return this._http.get(`${this.MEAL_DB_API}filter.php?c=${category}`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getMealsByArea(area: string): Observable<MealDataObject[]> {
    return this._http.get(`${this.MEAL_DB_API}filter.php?a=${area}`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getMealById(id: string): Observable<MealDataObject[]|null> {
    return this._http.get(`${this.MEAL_DB_API}lookup.php?i=${id}`)
      .pipe(map((data: Record<string, any>) => data['meals'] || null));
  }

  getMealsByIngredient(ingredient: string|string[]): Observable<MealDataObject[]|null> {
    const searchValue = Array.isArray(ingredient) ? ingredient.join(',') : ingredient;
    return this._http.get(`${this.MEAL_DB_API}filter.php?i=${searchValue}`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getMealsByFirstLetter(letter: string): Observable<MealDataObject[]|null> {
    return this._http.get(`${this.MEAL_DB_API}search.php?f=${letter}`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getMealByName(name: string): Observable<MealDataObject[]|null> {
    return this._http.get(`${this.MEAL_DB_API}search.php?s=${name}`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getRandomMeal(multi = false): Observable<MealDataObject[]> {
    const randomPath = multi ? 'randomselection.php' : 'random.php';
    return this._http.get(`${this.MEAL_DB_API}${randomPath}`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }

  getLatestMeals(): Observable<MealDataObject[]> {
    return this._http.get(`${this.MEAL_DB_API}latest.php`)
      .pipe(map((data: Record<string, any>) => data['meals']));
  }
}
