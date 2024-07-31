import { Component, effect, inject, OnInit } from '@angular/core';
import { MealDbStore } from '../../core/stores/meal-db.store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [MealDbStore],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnInit {
  private _mealStore = inject(MealDbStore);

  vm = this._mealStore.vm;

  private _route = inject(ActivatedRoute);

  meal = this._mealStore.selectedMeal();

  constructor() {
    effect(() => this.meal = this._mealStore.selectedMeal());
  }

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    this._mealStore.getMealByIdEffect(id);
  }
}
