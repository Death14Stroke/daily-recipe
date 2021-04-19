import React, { FC, useContext, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import _ from 'lodash';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { CategoriesContext, PreferencesContext } from '../context';
import { Category, TimeFilter } from '../models';
import { useMultiSelection, useSingleSelection } from '../hooks/selection';
import { Chip } from '../components/view';
import { Header, HeaderTextOption } from '../components/header';
import MasonryList, { ItemInfo } from '../components/container/MasonryList';

interface Props {
	navigation: StackNavigationProp<RootStackParamList, 'Filter'>;
}

const timeFilters: TimeFilter[] = [
	{ value: 15, label: 'Under 15 mins' },
	{ value: 30, label: 'Under 30 mins' },
	{ value: 60, label: 'Under 60 mins' }
];

const FilterScreen: FC<Props> = ({ navigation }) => {
	const { state: categories } = useContext(CategoriesContext);
	const {
		state: { dishTypes, cookTime },
		actions: { updateCookTime, updateDishTypes }
	} = useContext(PreferencesContext);

	const [
		selectedCookTime,
		updateSelectedCookTime
	] = useSingleSelection<number>(cookTime);
	const [
		selectedDishTypes,
		updateSelectedDishTypes,
		isSelectedDishType,
		clearSelectedDishTypes
	] = useMultiSelection<number>(dishTypes);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<HeaderTextOption
						title='Clear all'
						onPress={() => {
							updateSelectedCookTime(undefined);
							clearSelectedDishTypes();
						}}
					/>
				);
			}
		});
	}, [navigation]);

	useEffect(() => {
		updateCookTime(selectedCookTime);
	}, [selectedCookTime]);

	useEffect(() => {
		updateDishTypes([...selectedDishTypes]);
	}, [selectedDishTypes]);

	const renderTimeChip = ({ item }: ItemInfo<TimeFilter>) => {
		const { value, label } = item;

		return (
			<Chip
				key={value}
				label={label}
				selected={selectedCookTime === value}
				containerStyle={{ marginRight: 10, marginBottom: 10 }}
				onPress={() => updateSelectedCookTime(value)}
			/>
		);
	};

	const renderCategoriesChip = ({ item }: ItemInfo<Category>) => {
		const { id, name } = item;

		return (
			<Chip
				key={id}
				label={name}
				selected={isSelectedDishType(id)}
				containerStyle={{ marginRight: 10, marginBottom: 10 }}
				onPress={() => {
					updateSelectedDishTypes(id);
				}}
			/>
		);
	};

	return (
		<View style={{ flex: 1, marginHorizontal: 15 }}>
			<StatusBar translucent backgroundColor='transparent' />
			<Header title='Filter' />
			<Text style={styles.heading}>Dish type</Text>
			<MasonryList data={categories} renderItem={renderCategoriesChip} />
			<Text style={styles.heading}>Cook time</Text>
			<MasonryList data={timeFilters} renderItem={renderTimeChip} />
		</View>
	);
};

const styles = StyleSheet.create({
	heading: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlignVertical: 'center',
		marginTop: 20,
		marginBottom: 15
	}
});

export default FilterScreen;
