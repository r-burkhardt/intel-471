import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeTileComponent } from './recipe-tile.component';
import { Meal } from '../../core/models/meal';

describe('RecipeTileComponent', () => {
  let component: RecipeTileComponent;
  let fixture: ComponentFixture<RecipeTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update meal input property correctly', () => {
    const mockMeal: Meal = {
      id: '1',
      name: 'Meal 1',
      category: 'Category 1',
      area: 'Area 1',
      instructions: 'Instructions 1',
      thumbnail: 'Thumb 1',
      tags: ['Tag1'],
      youtube: 'YouTube 1',
      ingredients: [{ ingredient: 'Ingredient 1', measure: 'Measure 1' }],
      source: 'Source 1',
      thumbnailSource: 'ThumbSource 1',
      creativeCommonsConfirmed: false,
      dateModified: 'Date 1'
    };
    component.meal = mockMeal;
    expect(component.meal).toEqual(mockMeal);
  });
});
