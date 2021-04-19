import { Dispatch } from 'react';
import { createDataContext, ReducerAction } from '../hooks/context';

interface Action extends ReducerAction {
	type: 'update_cooktime' | 'update_dish_types';
}

type State = {
	dishTypes: number[];
	cookTime: number | undefined;
};

const INITIAL_STATE: State = { dishTypes: [], cookTime: undefined };

const preferencesReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'update_cooktime':
			return { ...state, cookTime: action.payload };
		case 'update_dish_types':
			return { ...state, dishTypes: action.payload };
		default:
			return state;
	}
};

const updateCookTime = (dispatch: Dispatch<Action>) => (
	cookTime: number | undefined
) => {
	dispatch({ type: 'update_cooktime', payload: cookTime });
};

const updateDishTypes = (dispatch: Dispatch<Action>) => (
	categories: number[]
) => {
	dispatch({ type: 'update_dish_types', payload: categories });
};

export const {
	Context: PreferencesContext,
	Provider: PreferencesProvider
} = createDataContext(
	preferencesReducer,
	{ updateDishTypes, updateCookTime },
	INITIAL_STATE
);
