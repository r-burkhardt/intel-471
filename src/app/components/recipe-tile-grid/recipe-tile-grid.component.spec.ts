import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeTileGridComponent } from './recipe-tile-grid.component';
import { Meal } from '../../core/models/meal';
import { CommonModule } from '@angular/common';
import { RecipeTileComponent } from '../recipe-tile/recipe-tile.component';

describe('RecipeTileGridComponent', () => {
  let component: RecipeTileGridComponent;
  let fixture: ComponentFixture<RecipeTileGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RecipeTileComponent,
        RecipeTileGridComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeTileGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update meals input property correctly', () => {
    const mockMeals: Meal[] = [
      { id: '1', name: 'Meal 1', category: 'Category 1', area: 'Area 1', instructions: 'Instructions 1', thumbnail: 'Thumb 1', tags: ['Tag1'], youtube: 'YouTube 1', ingredients: [{ ingredient: 'Ingredient 1', measure: 'Measure 1' }], source: 'Source 1', thumbnailSource: 'ThumbSource 1', creativeCommonsConfirmed: false, dateModified: 'Date 1' }
    ];
    component.meals = mockMeals;
    expect(component.meals).toEqual(mockMeals);
  });
});
