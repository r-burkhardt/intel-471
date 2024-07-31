import { Meal } from './meal';
import { MealDataObject } from '../interfaces/meal-data-object.interface';

describe('Meal', () => {
  let mealData: MealDataObject;

  beforeEach(() => {
    mealData = {
      idMeal: '52771',
      strMeal: 'Spaghetti Carbonara',
      strCategory: 'Pasta',
      strArea: 'Italian',
      strInstructions: '1. Bring a large pot of salted water to the boil.\r\n2. Add spaghetti and cook for 8 to 10 minutes or until al dente; drain.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/xxrxux1503067728.jpg',
      strTags: 'Pasta,Italian',
      strYoutube: 'https://www.youtube.com/watch?v=HJY9G50JfJ4',
      strIngredient1: 'Spaghetti',
      strMeasure1: '1 pound',
      strSource: 'https://www.simplyrecipes.com/recipes/spaghetti_carbonara/',
      strImageSource: 'https://www.simplyrecipes.com/',
      strCreativeCommonsConfirmed: 'false',
      dateModified: '2017-09-07'
    };
  });

  it('should initialize correctly', () => {
    const meal = new Meal(mealData);
    expect(meal).toBeTruthy();
  });

  it('should parse data correctly', () => {
    const meal = new Meal(mealData);
    expect(meal.id).toBe(52771);
    expect(meal.name).toBe('Spaghetti Carbonara');
    expect(meal.category).toBe('Pasta');
    expect(meal.area).toBe('Italian');
    expect(meal.instructions).toEqual(['Bring a large pot of salted water to the boil.', 'Add spaghetti and cook for 8 to 10 minutes or until al dente; drain.']);
    expect(meal.thumbnail).toBe('https://www.themealdb.com/images/media/meals/xxrxux1503067728.jpg');
    expect(meal.tags).toEqual(['Pasta', 'Italian']);
    expect(meal.youtube).toBe('https://www.youtube.com/watch?v=HJY9G50JfJ4');
    expect(meal.ingredients).toEqual([{ ingredient: 'Spaghetti', measure: '1 pound' }]);
    expect(meal.source).toBe('https://www.simplyrecipes.com/recipes/spaghetti_carbonara/');
    expect(meal.thumbnailSource).toBe('https://www.simplyrecipes.com/');
    expect(meal.creativeCommonsConfirmed).toBe(false);
    expect(meal.dateModified).toBe('2017-09-07');
  });

  it('should parse ingredients correctly', () => {
    const meal = new Meal(mealData);
    expect(meal.ingredients).toEqual([{ ingredient: 'Spaghetti', measure: '1 pound' }]);
  });

  it('should parse instructions correctly', () => {
    const meal = new Meal(mealData);
    expect(meal.instructions).toEqual(['Bring a large pot of salted water to the boil.', 'Add spaghetti and cook for 8 to 10 minutes or until al dente; drain.']);
  });

  it('should find and remove servings correctly', () => {
    mealData.strInstructions = 'Serves 4\r\n1. Bring a large pot of salted water to the boil.\r\n2. Add spaghetti and cook for 8 to 10 minutes or until al dente; drain.';
    const meal = new Meal(mealData);
    expect(meal.servings).toBe(4);
    expect(meal.instructions).toEqual(['Bring a large pot of salted water to the boil.', 'Add spaghetti and cook for 8 to 10 minutes or until al dente; drain.']);
  });
});
