import { Dispatch } from 'react';
import { createDataContext, ReducerAction } from '../hooks/context';
import { Recipe } from '../models';
import food from '../api/food';
import _ from 'lodash';

interface Action extends ReducerAction {
	type: 'fetch_trending' | 'fetch_bookmarks' | 'search' | 'update_bookmark';
}

type State = { trending: Recipe[]; search: Recipe[]; bookmarks: Recipe[] };
type SearchParams = {
	cookTime: number | undefined;
	dishTypes: number[] | undefined;
	query: string | undefined;
	ingredients: number[] | undefined;
};

const INITIAL_STATE: State = {
	trending: [],
	search: [],
	bookmarks: []
};

const recipeReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'fetch_trending':
			return { ...state, trending: action.payload };
		case 'fetch_bookmarks':
			return { ...state, bookmarks: action.payload };
		case 'search':
			return { ...state, search: action.payload };
		case 'update_bookmark':
			const { recipe, added } = action.payload;
			recipe.isBookmarked = added;

			let trending = state.trending.map(r => {
				if (recipe.recipeId === r.recipeId) r.isBookmarked = added;
				return r;
			});
			let search = state.search.map(r => {
				if (recipe.recipeId === r.recipeId) r.isBookmarked = added;
				return r;
			});
			let bookmarks = added
				? [...state.bookmarks, recipe]
				: state.bookmarks.filter(r => r.recipeId !== recipe.recipeId);

			return { ...state, trending, search, bookmarks };
		default:
			return state;
	}
};

const fetchTrendingRecipes = (dispatch: Dispatch<Action>) => async () => {
	try {
		let { data } = await food.get<Recipe[]>('/recipes/trending');
		dispatch({ type: 'fetch_trending', payload: data });
	} catch (err) {
		console.log(err);
	}
};

const searchRecipes = (dispatch: Dispatch<Action>) => async ({
	cookTime,
	dishTypes,
	query
}: SearchParams) => {
	try {
		let { data } = await food.post<Recipe[]>('/search', {
			cookTime,
			dishTypes,
			query
		});
		dispatch({ type: 'search', payload: data });
	} catch (err) {
		console.log(err);
	}
};

const bookmarkRecipe = (dispatch: Dispatch<Action>) => async (
	recipe: Recipe
) => {
	try {
		let {
			data: { added }
		} = await food.post<{ added: boolean }>('/bookmarks', null, {
			params: {
				recipeId: recipe.recipeId
			}
		});
		dispatch({ type: 'update_bookmark', payload: { recipe, added } });
	} catch (err) {
		console.log(err);
	}
};

const fetchBookmarks = (dispatch: Dispatch<Action>) => async () => {
	try {
		let { data } = await food.get<Recipe[]>('/bookmarks');
		dispatch({ type: 'fetch_bookmarks', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const {
	Context: RecipesContext,
	Provider: RecipesProvider
} = createDataContext(
	recipeReducer,
	{ fetchTrendingRecipes, searchRecipes, bookmarkRecipe, fetchBookmarks },
	INITIAL_STATE
);
