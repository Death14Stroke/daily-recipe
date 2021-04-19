import { Dispatch } from 'react';
import { createDataContext, ReducerAction } from '../hooks/context';
import { Recipe } from '../models';
import food from '../api/food';

interface Action extends ReducerAction {
	type: 'fetch_trending' | 'search';
}

type State = { trending: Recipe[]; search: Recipe[] };
type SearchParams = {
	cookTime: number | undefined;
	dishTypes: number[] | undefined;
	query: string | undefined;
	ingredients: number[] | undefined;
};

const INITIAL_STATE: State = {
	trending: [],
	search: []
};

const recipeReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'fetch_trending':
			return { ...state, trending: action.payload };
		case 'search':
			return { ...state, search: action.payload };
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

export const {
	Context: RecipesContext,
	Provider: RecipesProvider
} = createDataContext(
	recipeReducer,
	{ fetchTrendingRecipes, searchRecipes },
	INITIAL_STATE
);
