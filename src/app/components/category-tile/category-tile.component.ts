import { Component, Input } from '@angular/core';
import { Category } from '../../core/interfaces/category.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-tile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './category-tile.component.html',
  styleUrl: './category-tile.component.scss'
})
export class CategoryTileComponent {
  private _category!: Category;

  @Input() set category(value: Category ) {
    this._category = value;
  }

  get category(): Category {
    return this._category;
  }
}
