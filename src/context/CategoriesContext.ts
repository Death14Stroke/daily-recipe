import { Dispatch } from 'react';
import _ from 'lodash';
import food from '../api/food';
import { createDataContext, ReducerAction } from '../hooks/context';
import { Category } from '../models/Category';

interface Action extends ReducerAction {
	type: 'fetch';
}

type State = Category[];

const INITIAL_STATE: State = [];

const categoriesReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'fetch':
			return action.payload;
		default:
			return state;
	}
};

const fetchCategories = (dispatch: Dispatch<Action>) => async () => {
	try {
		let { data } = await food.get<Category[]>('/categories');
		dispatch({ type: 'fetch', payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const {
	Context: CategoriesContext,
	Provider: CategoriesProvider
} = createDataContext(categoriesReducer, { fetchCategories }, INITIAL_STATE);
