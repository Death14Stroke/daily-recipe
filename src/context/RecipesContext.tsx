import React, {
	createContext,
	Dispatch,
	FC,
	useEffect,
	useReducer
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import _ from 'lodash';
import food from '../api/food';
import { ReducerAction } from '../hooks/context';
import { Recipe } from '../models';

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
type ContextValue = {
	state: State;
	actions: {
		[key in keyof typeof stateActions]: ReturnType<
			typeof stateActions[key]
		>;
	};
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
			const recipe = action.payload;
			const added =
				state.bookmarks.find(r => r.recipeId === recipe.recipeId) ===
				undefined;

			console.log('adding bookmark:', recipe.title, added);

			let bookmarks = added
				? [...state.bookmarks, recipe]
				: state.bookmarks.filter(r => r.recipeId !== recipe.recipeId);
			let trending = state.trending.map(r => {
				if (recipe.recipeId === r.recipeId) r.isBookmarked = added;
				return r;
			});
			let search = state.search.map(r => {
				if (recipe.recipeId === r.recipeId) r.isBookmarked = added;
				return r;
			});

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
	dispatch({ type: 'update_bookmark', payload: recipe });
};

const stateActions = {
	fetchTrendingRecipes,
	searchRecipes,
	bookmarkRecipe
};

const Context = createContext<ContextValue>(undefined!);

const Provider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(recipeReducer, INITIAL_STATE);

	const syncBookmarks = async () => {
		try {
			console.log(
				'sync:',
				state.bookmarks.map(recipe => recipe.recipeId)
			);
			await food.post('/bookmarks', {
				bookmarks: state.bookmarks.map(recipe => recipe.recipeId)
			});
		} catch (err) {
			console.log(err);
		}
	};

	const fetchBookmarks = async () => {
		try {
			let { data } = await food.get<Recipe[]>('/bookmarks');
			dispatch({ type: 'fetch_bookmarks', payload: data });
		} catch (err) {
			console.log(err);
		}
	};

	const appStateListener = (state: AppStateStatus) => {
		if (state === 'background') {
			syncBookmarks();
		}
	};

	useEffect(() => {
		AppState.addEventListener('change', appStateListener);

		return () => {
			AppState.removeEventListener('change', appStateListener);
		};
	}, [state.bookmarks]);

	useEffect(() => {
		fetchBookmarks();
	}, []);

	return (
		<Context.Provider
			value={{
				state,
				actions: {
					fetchTrendingRecipes: fetchTrendingRecipes(dispatch),
					searchRecipes: searchRecipes(dispatch),
					bookmarkRecipe: bookmarkRecipe(dispatch)
				}
			}}>
			{children}
		</Context.Provider>
	);
};

export { Context as RecipesContext, Provider as RecipesProvider };
