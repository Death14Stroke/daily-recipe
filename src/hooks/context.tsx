import React, { createContext, Dispatch, FC, useReducer } from 'react';
import _ from 'lodash';

export type ReducerAction = { type: string; payload: any };
export type Actions<R> = {
	[key: string]: (dispatch: Dispatch<R>) => any;
};

export const createDataContext = <
	S extends any,
	R extends ReducerAction,
	A extends Actions<R>
>(
	reducer: (state: S, action: R) => S,
	actions: A,
	initialState: S
) => {
	type RealActions = { [key in keyof A]: ReturnType<A[key]> };
	type ContextValue = { state: S; actions: RealActions };

	const Context = createContext<ContextValue>(undefined!);

	const Provider: FC = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, initialState);
		const boundActions = _.mapValues(actions, func => func(dispatch));

		return (
			<Context.Provider value={{ state, actions: { ...boundActions } }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};
