import { Component, Input } from '@angular/core';
import { Meal } from '../../core/models/meal';
import { RouterLink } from '@angular/router';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-recipe-tile',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './recipe-tile.component.html',
  styleUrl: './recipe-tile.component.scss'
})
export class RecipeTileComponent {
  private _meal!: Meal;

  @Input() set meal(value: Meal) {
    this._meal = value;
  }

  get meal(): Meal {
    return this._meal;
  }
}
