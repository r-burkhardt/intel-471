import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MealDbStore } from '../../core/stores/meal-db.store';
import { FiltersStore } from '../../core/stores/filters.store';
import { RecipeTileComponent } from '../../components/recipe-tile/recipe-tile.component';
import { CategoryTileComponent } from '../../components/category-tile/category-tile.component';
import { CommonModule } from '@angular/common';
import { Category } from '../../core/interfaces/category.interface';
import { RecipeTileGridComponent } from '../../components/recipe-tile-grid/recipe-tile-grid.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RecipeTileComponent,
    CategoryTileComponent,
    RecipeTileGridComponent,
    FormsModule
  ],
  providers: [FiltersStore, MealDbStore],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  private _mealStore = inject(MealDbStore);

  private _filtersStore = inject(FiltersStore);

  private _router = inject(Router);

  mVM = this._mealStore.vm;

  searchText = '';

  constructor() {
    this._mealStore.getLatestMealsEffect();
  }

  get categories(): Category[] {
    return this._filtersStore.categories();
  }

  search() {
    this._router.navigate(['/search'], { queryParams: { search: this.searchText } });
  }
}
