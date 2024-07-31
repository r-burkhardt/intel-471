import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FiltersStore } from '../../core/stores/filters.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortPipe } from '../../core/pipes/sort.pipe';
import { Ingredient } from '../../core/interfaces/ingredient.interface';
import { Filters } from '../../core/interfaces/filters.interface';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, SortPipe],
  providers: [FiltersStore],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnChanges {
  @ViewChild('ingredientSearch') ingredientSearch!: ElementRef;

  @Input() filters: Filters = {};

  @Output() filtersChange = new EventEmitter<Filters>();

  private _filtersStore = inject(FiltersStore);

  selectedCategory = '';
  selectedArea = '';
  selectedIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[]|null = null;
  searchedIngredients: Ingredient[]|null = null;

  searchInput = '';

  unselectedIngredients = this._filtersStore.ingredients;

  selectedCategoryTest = this._filtersStore.selectedCategory;

  vm = this._filtersStore.vm;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters'].currentValue) {
      this._onFiltersChange(changes['filters'].currentValue);
    }
  }

  searchIngredients(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchedIngredients = this.unselectedIngredients()
      .filter(i => i !== this.selectedIngredients.find(s => s.id === i.id))
      .filter(i => i.ingredient.toLowerCase().includes(target.value.toLowerCase()));
  }

  onSelectIngredient(ingredient: Ingredient) {
    const searchInput = this.ingredientSearch.nativeElement as HTMLInputElement;
    if (searchInput.value) searchInput.value = '';
    this.selectedIngredients = [...this.selectedIngredients, ingredient];
    this.filteredIngredients = this.unselectedIngredients()?.filter(i => i !== ingredient);
    this.searchedIngredients = null;
    this._filtersStore.setSelectedIngredients(this.selectedIngredients.map(i => i.ingredient));
    this._applyFilters();
  }

  onUnselectIngredient(ingredient: Ingredient) {
    this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient);
    this.filteredIngredients = this.unselectedIngredients()?.filter(i => i !== ingredient);
    this._filtersStore.setSelectedIngredients(this.selectedIngredients.map(i => i.ingredient));
    this._applyFilters();
  }

  onSelectArea(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.selectedArea = value;
    this._filtersStore.setSelectedArea(value);
    this._applyFilters();
  }

  onSelectCategory(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.selectedCategory = value;
    this._filtersStore.setSelectedCategory(value);
    this._applyFilters();
  }

  onSearch() {
    // const target = event;
    // console.log('search', event?.input?.value)
    this._applyFilters();
  }

  private _onFiltersChange(value: Filters) {
    if (value.category) this.selectedCategory = value.category;
    if (value.area) this.selectedArea = value.area;
    if (value.ingredients) {
      this.selectedIngredients = value.ingredients.map(i => this._filtersStore.ingredients().find(ing => ing.ingredient === i)!);
      this.filteredIngredients = this.unselectedIngredients()?.filter(i => !this.selectedIngredients.includes(i));
    }
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedArea = '';
    this.selectedIngredients = [];
    this._filtersStore.setSelectedCategory('');
    this._filtersStore.setSelectedArea('');
    this._filtersStore.setSelectedIngredients([]);
    this._applyFilters();
  }

  private _applyFilters() {
    const updatedFilters: Filters = { };
    if (this.selectedCategory) updatedFilters.category = this.selectedCategory;
    if (this.selectedArea) updatedFilters.area = this.selectedArea;
    if (this.selectedIngredients.length) updatedFilters.ingredients = this.selectedIngredients.map(i => i.ingredient);
    if (this.searchInput) updatedFilters.search = this.searchInput;
    console.log('updatedFilters', updatedFilters);
    this.filtersChange.emit(updatedFilters);
  }
}
