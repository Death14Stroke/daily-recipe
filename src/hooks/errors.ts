import { useReducer } from 'react';
import _ from 'lodash';

type Errors = { [key: string]: string };

interface Action {
	type: 'update_errors' | 'clear_errors';
	payload?: Errors;
}

const errorsReducer = (state: Errors, action: Action) => {
	switch (action.type) {
		case 'update_errors':
			const newState = { ...state, ...action.payload };
			return _.pickBy(newState, _.identity);
		case 'clear_errors':
			return {};
		default:
			return state;
	}
};

export const useTrackErrors = () => {
	const [errors, dispatch] = useReducer(errorsReducer, {});

	const updateErrors = (errors: Errors) => {
		dispatch({ type: 'update_errors', payload: errors });
	};

	const clearErrors = () => {
		dispatch({ type: 'clear_errors' });
	};

	return { errors, updateErrors, clearErrors };
};
