import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MealDbService } from './meal-db.service';
import { HttpConnectorService } from '../http-connector/http-connector.service';

describe('MealDbService', () => {
  let service: MealDbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MealDbService, HttpConnectorService]
    });
    service = TestBed.inject(MealDbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return categories', () => {
    const mockCategories = [{ id: '1', name: 'Category 1' }];
    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}categories.php`);
    expect(req.request.method).toBe('GET');
    req.flush({ categories: mockCategories });
  });

  it('should return areas', () => {
    const mockAreas = [{ id: '1', name: 'Area 1' }];
    service.getAreas().subscribe(areas => {
      expect(areas).toEqual(mockAreas);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}list.php?a=list`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockAreas });
  });

  it('should return ingredients', () => {
    const mockIngredients = [{ id: '1', name: 'Ingredient 1' }];
    service.getIngredients().subscribe(ingredients => {
      expect(ingredients).toEqual(mockIngredients);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}list.php?i=list`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockIngredients });
  });

  it('should return meals by category', () => {
    const mockMeals = [{ id: '1', name: 'Meal 1' }];
    service.getMealsByCategory('test-category').subscribe(meals => {
      expect(meals).toEqual(mockMeals);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}filter.php?c=test-category`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeals });
  });

  it('should return meals by area', () => {
    const mockMeals = [{ id: '1', name: 'Meal 1' }];
    service.getMealsByArea('test-area').subscribe(meals => {
      expect(meals).toEqual(mockMeals);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}filter.php?a=test-area`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeals });
  });

  it('should return meal by ID', () => {
    const mockMeal = [{ id: '1', name: 'Meal 1' }];
    service.getMealById('1').subscribe(meal => {
      expect(meal).toEqual(mockMeal);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}lookup.php?i=1`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeal });
  });

  it('should return meals by ingredient', () => {
    const mockMeals = [{ id: '1', name: 'Meal 1' }];
    service.getMealsByIngredient('test-ingredient').subscribe(meals => {
      expect(meals).toEqual(mockMeals);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}filter.php?i=test-ingredient`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeals });
  });

  it('should return meals by first letter', () => {
    const mockMeals = [{ id: '1', name: 'Meal 1' }];
    service.getMealsByFirstLetter('a').subscribe(meals => {
      expect(meals).toEqual(mockMeals);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}search.php?f=a`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeals });
  });

  it('should return meal by name', () => {
    const mockMeal = [{ id: '1', name: 'Meal 1' }];
    service.getMealByName('test-name').subscribe(meal => {
      expect(meal).toEqual(mockMeal);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}search.php?s=test-name`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeal });
  });

  it('should return random meal', () => {
    const mockMeal = [{ id: '1', name: 'Meal 1' }];
    service.getRandomMeal().subscribe(meal => {
      expect(meal).toEqual(mockMeal);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}random.php`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeal });
  });

  it('should return latest meals', () => {
    const mockMeals = [{ id: '1', name: 'Meal 1' }];
    service.getLatestMeals().subscribe(meals => {
      expect(meals).toEqual(mockMeals);
    });
    const req = httpMock.expectOne(`${service.MEAL_DB_API}latest.php`);
    expect(req.request.method).toBe('GET');
    req.flush({ meals: mockMeals });
  });
});
