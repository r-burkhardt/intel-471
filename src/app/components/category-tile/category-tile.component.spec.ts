import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryTileComponent } from './category-tile.component';
import { Category } from '../../core/interfaces/category.interface';

describe('CategoryTileComponent', () => {
  let component: CategoryTileComponent;
  let fixture: ComponentFixture<CategoryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update category input property correctly', () => {
    const mockCategory: Category = {
      id: '1',
      name: 'Category 1',
      description: 'Description 1',
      thumbnail: 'Thumb 1'
    };
    component.category = mockCategory;
    expect(component.category).toEqual(mockCategory);
  });
});
