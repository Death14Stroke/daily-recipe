import React, { FC, useContext, useEffect, useState } from 'react';
import {
	Text,
	StyleSheet,
	FlatList,
	ListRenderItem,
	Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, BottomTabParamList } from '../../App';
import { GlobalStyles } from '../styling';
import { CategoriesContext, PreferencesContext } from '../context';
import { Category } from '../models';
import { Header } from '../components/header';
import { CategoryCard, SearchBar } from '../components/view';

interface Props {
	navigation: CompositeNavigationProp<
		BottomTabNavigationProp<BottomTabParamList, 'Explore'>,
		StackNavigationProp<RootStackParamList>
	>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const ExploreScreen: FC<Props> = ({ navigation }) => {
	const [query, setQuery] = useState('');
	const {
		state: categories,
		actions: { fetchCategories }
	} = useContext(CategoriesContext);
	const { state: filters } = useContext(PreferencesContext);

	const renderCategory: ListRenderItem<Category> = ({ item }) => {
		return (
			<CategoryCard
				category={item}
				containerStyle={[
					{ marginHorizontal: 5 },
					{
						maxWidth: (SCREEN_WIDTH - 30 - 20) / 3
					}
				]}
				onPress={() =>
					navigation.navigate('SearchResults', {
						dishTypes: [item.id]
					})
				}
			/>
		);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<SafeAreaView style={GlobalStyles.tabScreenContainer}>
			<Header title='Explore' />
			<SearchBar
				placeholder='What are you craving?'
				value={query}
				onChangeText={setQuery}
				containerStyle={styles.search}
				onSubmitEditing={() => {
					navigation.navigate('SearchResults', { query, ...filters });
				}}
				onFilterPress={() => navigation.navigate('Filter')}
			/>
			<Text style={styles.heading}>Quick search</Text>
			<FlatList
				data={categories}
				keyExtractor={(category: Category) => category.id.toString()}
				renderItem={renderCategory}
				style={{
					marginHorizontal: 10,
					marginVertical: 10
				}}
				contentContainerStyle={{ paddingTop: 5 }}
				numColumns={3}
				columnWrapperStyle={{
					paddingBottom: 10
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	search: {
		marginHorizontal: 15
	},
	heading: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlignVertical: 'center',
		marginTop: 20,
		marginHorizontal: 15
	}
});

export default ExploreScreen;
