import { Category } from './Category';
import { Ingredient } from './Ingredient';

export type Quantity = { ingredient: Ingredient; amount: string };

export interface Recipe {
	recipeId: number;
	category: Category;
	title: string;
	photo_url: string;
	photosArray: string[];
	time: string;
	ingredients: Quantity[];
	steps: string[];
	isBookmarked: boolean;
}
