import React, { FC, useContext, useEffect } from 'react';
import {
	FlatList,
	ListRenderItem,
	StyleSheet,
	View,
	TouchableOpacity,
	StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, Text } from 'react-native-elements';
import { CompositeNavigationProp } from '@react-navigation/core';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import { BottomTabParamList, RootStackParamList } from '../../App';
import { CardDimens, GlobalStyles } from '../styling';
import { RecipesContext, IngredientsContext } from '../context';
import { Recipe, Ingredient } from '../models';
import { Header } from '../components/header';
import { RecipeCard, IngredientCard } from '../components/view';
import { HorizontalGridList, TouchableShrink } from '../components/container';
import { RecipesSkeleton, IngredientsSkeleton } from '../skeletons';

interface Props {
	navigation: CompositeNavigationProp<
		BottomTabNavigationProp<BottomTabParamList, 'Recipes'>,
		StackNavigationProp<RootStackParamList>
	>;
}

const RecipesScreen: FC<Props> = ({ navigation }) => {
	const {
		state: { trending: recipes },
		actions: { fetchTrendingRecipes }
	} = useContext(RecipesContext);
	const {
		state: { trending: ingredients },
		actions: { fetchTopIngredients }
	} = useContext(IngredientsContext);

	const renderRecipe: ListRenderItem<Recipe> = ({ item }) => {
		return (
			<RecipeCard
				recipe={item}
				containerStyle={styles.recipeContainer}
				onPress={() =>
					navigation.navigate('RecipeDetail', { recipe: item })
				}
			/>
		);
	};

	const renderIngredient: ListRenderItem<Ingredient> = ({ item, index }) => {
		const { ingredientId } = item;

		return (
			<TouchableShrink
				onPress={() =>
					navigation.navigate('SearchResults', {
						ingredients: [ingredientId]
					})
				}
				scaleFrom={1}
				scaleTo={0.95}>
				<IngredientCard
					ingredient={item}
					containerStyle={styles.ingredientContainer}
				/>
			</TouchableShrink>
		);
	};

	useEffect(() => {
		fetchTrendingRecipes();
		fetchTopIngredients();
	}, []);

	return (
		<SafeAreaView style={GlobalStyles.tabScreenContainer}>
			<StatusBar translucent backgroundColor='transparent' />
			<Header title='Recipes' />
			{recipes.length === 0 ? (
				<RecipesSkeleton />
			) : (
				<FlatList
					data={recipes}
					keyExtractor={({ recipeId }) => `rec_${recipeId}`}
					renderItem={renderRecipe}
					horizontal
					getItemLayout={(_, index) => ({
						length: CardDimens.recipe.width + 20,
						offset: (CardDimens.recipe.width + 20) * index,
						index
					})}
					contentContainerStyle={{ paddingHorizontal: 10 }}
					showsHorizontalScrollIndicator={false}
					style={styles.list}
				/>
			)}
			<View style={styles.ingredientHeaderContainer}>
				<Text style={styles.heading}>Search by ingredients</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate('Ingredients')}>
					<Text style={[styles.viewAll, { color: colors.primary }]}>
						View all
					</Text>
				</TouchableOpacity>
			</View>
			{ingredients.length === 0 ? (
				<IngredientsSkeleton />
			) : (
				<HorizontalGridList
					data={ingredients}
					keyExtractor={({ ingredientId }) => `ing_${ingredientId}`}
					gridSize={2}
					renderItem={renderIngredient}
					containerStyle={styles.list}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	recipeContainer: {
		width: CardDimens.recipe.width,
		marginHorizontal: 10,
		marginBottom: 5
	},
	list: {
		flexGrow: 0,
		paddingTop: 5
	},
	heading: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlignVertical: 'center'
	},
	ingredientContainer: {
		marginBottom: 15,
		marginHorizontal: 10,
		...CardDimens.ingredient
	},
	ingredientHeaderContainer: {
		marginTop: 20,
		marginBottom: 5,
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	viewAll: {
		fontWeight: 'bold',
		textAlignVertical: 'center'
	}
});

export default RecipesScreen;
