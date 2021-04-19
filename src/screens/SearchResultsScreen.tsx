import React, { FC, useEffect, useState } from 'react';
import {
	FlatList,
	ListRenderItem,
	View,
	StyleSheet,
	StatusBar
} from 'react-native';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import food from '../api/food';
import { Recipe } from '../models';
import { ProgressOverlay, RecipeCard } from '../components/view';
import { Header } from '../components/header';

interface Props {
	route: RouteProp<RootStackParamList, 'SearchResults'>;
	navigation: StackNavigationProp<RootStackParamList, 'SearchResults'>;
}

const SearchResultsScreen: FC<Props> = ({ route, navigation }) => {
	const { query, cookTime, dishTypes, ingredients } = route.params;
	const [results, setResults] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);

	const searchRecipes = async () => {
		try {
			let { data } = await food.post<Recipe[]>('/search', {
				cookTime,
				dishTypes,
				query,
				ingredients
			});
			setResults(data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const renderRecipe: ListRenderItem<Recipe> = ({ item }) => {
		return (
			<RecipeCard
				recipe={item}
				containerStyle={[styles.recipeContainer]}
				onPress={() =>
					navigation.navigate('RecipeDetail', { recipe: item })
				}
			/>
		);
	};

	useEffect(() => {
		searchRecipes();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<StatusBar translucent backgroundColor='transparent' />
			{!loading && (
				<>
					<Header title={`Found ${results.length} items`} />
					<FlatList
						data={results}
						keyExtractor={(recipe: Recipe) =>
							recipe.recipeId.toString()
						}
						renderItem={renderRecipe}
						style={{ flexGrow: 0 }}
						showsVerticalScrollIndicator={false}
					/>
				</>
			)}
			<ProgressOverlay isVisible={loading} />
		</View>
	);
};

const styles = StyleSheet.create({
	recipeContainer: {
		marginHorizontal: 20,
		marginBottom: 20
	}
});

export default SearchResultsScreen;
