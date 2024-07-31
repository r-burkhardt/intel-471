import { Component, Input } from '@angular/core';
import { Meal } from '../../core/models/meal';
import { CommonModule } from '@angular/common';
import { RecipeTileComponent } from '../recipe-tile/recipe-tile.component';

@Component({
  selector: 'app-recipe-tile-grid',
  standalone: true,
  imports: [
    CommonModule,
    RecipeTileComponent
  ],
  templateUrl: './recipe-tile-grid.component.html',
  styleUrl: './recipe-tile-grid.component.scss'
})
export class RecipeTileGridComponent {
  private _meals: Meal[] = [];

  @Input() set meals(value: Meal[]) {
    this._meals = value;
  }

  get meals(): Meal[] {
    return this._meals;
  }
}
