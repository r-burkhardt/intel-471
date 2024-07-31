import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details.component';
import { MealDbStore } from '../../core/stores/meal-db.store';
import { of } from 'rxjs';

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;
  let mockMealDbStore: jasmine.SpyObj<MealDbStore>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockMealDbStore = jasmine.createSpyObj('MealDbStore', ['getMealByIdEffect', 'selectedMeal'], { vm: of({}) });
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: '123'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [RecipeDetailsComponent],
      providers: [
        { provide: MealDbStore, useValue: mockMealDbStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set meal property correctly', () => {
    const mealMock = { id: '123', name: 'Test Meal' };
    mockMealDbStore.selectedMeal.and.returnValue(mealMock);
    component.ngOnInit();
    expect(component.meal).toEqual(mealMock);
  });

  it('should call getMealByIdEffect with correct ID', () => {
    component.ngOnInit();
    expect(mockMealDbStore.getMealByIdEffect).toHaveBeenCalledWith('123');
  });
});
