import { MealIngredient } from '../interfaces/meal-ingredient.interface';
import { MealDataObject } from '../interfaces/meal-data-object.interface';

export class Meal {
  id: number | undefined; // 52771
  name: string | undefined; // Spaghetti Carbonara
  category: string | undefined; // Pasta
  area: string | undefined; // Italian
  instructions: string[] | undefined; // Bring a large pot of salted water to the boil. Add spaghetti and cook for 8 to 10 minutes or until al dente; drain.
  thumbnail: string | undefined; // https://www.themealdb.com/images/media/meals/xxrxux1503067728.jpg
  tags: string[] | undefined; // Pasta,Italian
  youtube: string | undefined; // https://www.youtube.com/watch?v=HJY9G50JfJ4
  ingredients: MealIngredient[] = []; // [{ ingredient: 'Spaghetti', measure: '1 pound' }]
  source: string | undefined; // https://www.simplyrecipes.com/recipes/spaghetti_carbonara/
  thumbnailSource: string | undefined; // https://www.simplyrecipes.com/
  creativeCommonsConfirmed: boolean | undefined; // false
  dateModified: string | undefined; // 2017-09-07
  servings: number | undefined; // 4

  constructor(data: MealDataObject) {
    this._parseData(data);
  }

  private _parseData(data: MealDataObject) {
    this.id = +data.idMeal;
    this.name = data.strMeal;
    this.category = data.strCategory;
    this.area = data?.strArea || '';
    this.instructions = this._parseInstructions(data.strInstructions || '');
    this.thumbnail = data?.strMealThumb || '';
    this.tags = data?.strTags?.split(',') || [];
    this.youtube = data?.strYoutube || '';
    this.ingredients = this._parseIngredients(data);
    this.source = data?.strSource || '';
    this.thumbnailSource = data?.strImageSource || '';
    this.creativeCommonsConfirmed = !!data?.strCreativeCommonsConfirmed;
    this.dateModified = data?.dateModified || '';
  }

  private _parseIngredients(data: MealDataObject): MealIngredient[] {
    const ingredients: MealIngredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = data?.[`strIngredient${i}` as keyof MealDataObject];
      const measure = data?.[`strMeasure${i}` as keyof MealDataObject];

      if (ingredient) ingredients.push({ ingredient, measure });
    }
    return ingredients;
  }

  private _parseInstructions(instructions: string): string[] {
    if (!instructions) return [];
    const splitInstructions = instructions.split('\r\n');
    return this._findServingsAndRemove(splitInstructions)
      .filter(instruction => instruction !== '' && !instruction.toLowerCase().startsWith('step'))
      .map(instruction => instruction.replace(/^\d+\.\s+/, ''));
  }

  private _findServingsAndRemove(instructions: string[]): string[] {
    const regex = /\d.*\b(servings|serves)\b/i;
    const servingsInstruction = instructions.find(instruction => regex.test(instruction));
    this.servings = !servingsInstruction ? undefined : +servingsInstruction;
    return instructions.filter(instruction => instruction !== servingsInstruction);
  }
}


