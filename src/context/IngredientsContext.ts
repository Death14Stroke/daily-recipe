import { Dispatch } from 'react';
import _ from 'lodash';
import { createDataContext, ReducerAction } from '../hooks/context';
import { Ingredient } from '../models';
import food from '../api/food';

interface Action extends ReducerAction {
	type: 'fetch_trending' | 'fetch_all';
}

type State = { trending: Ingredient[]; ingredients: Ingredient[] };
type PageParams = { page: number; pageSize: number };

const INITIAL_STATE: State = {
	trending: [],
	ingredients: []
};

const ingredientReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'fetch_trending':
			return { ...state, trending: action.payload };
		case 'fetch_all':
			return {
				...state,
				ingredients: _.uniqBy<Ingredient>(
					[...state.ingredients, ...action.payload],
					({ ingredientId }) => ingredientId
				)
			};
		default:
			return state;
	}
};

const fetchTopIngredients = (dispatch: Dispatch<Action>) => async () => {
	try {
		let { data } = await food.get<Ingredient[]>('/ingredients/trending');
		dispatch({ type: 'fetch_trending', payload: data });
	} catch (err) {
		console.log(err);
	}
};

const fetchIngredients = (dispatch: Dispatch<Action>) => async ({
	page,
	pageSize
}: PageParams): Promise<boolean> => {
	try {
		let { data } = await food.get<Ingredient[]>('/ingredients', {
			params: {
				page,
				pageSize
			}
		});
		dispatch({ type: 'fetch_all', payload: data });
		return data.length === 0;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export const {
	Context: IngredientsContext,
	Provider: IngredientsProvider
} = createDataContext(
	ingredientReducer,
	{ fetchTopIngredients, fetchIngredients },
	INITIAL_STATE
);
