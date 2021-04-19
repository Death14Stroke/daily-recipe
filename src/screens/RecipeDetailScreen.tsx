import React, { FC, ReactElement } from 'react';
import { Text, StyleSheet, ListRenderItem } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { RootStackParamList } from '../../App';
import { Quantity } from '../models';
import { PrimaryButton, QuantityCard } from '../components/view';
import { CollapsingListHeader } from '../components/header';
import { useTheme } from '../hooks/themes';

interface Props {
	route: RouteProp<RootStackParamList, 'RecipeDetail'>;
	navigation: StackNavigationProp<RootStackParamList, 'RecipeDetail'>;
}

const RecipeDetailScreen: FC<Props> = ({ route, navigation }) => {
	const { recipe } = route.params;
	const { photo_url, title, category, time, ingredients } = recipe;
	const { colors } = useTheme();

	const renderQuantityCard: ListRenderItem<Quantity> = ({ item }) => {
		return <QuantityCard quantity={item} />;
	};

	const buttonIcon = (): ReactElement => {
		return (
			<Feather
				name='arrow-right'
				size={24}
				color={colors.light}
				style={{ marginLeft: 10 }}
			/>
		);
	};

	return (
		<CollapsingListHeader
			maxHeight={300}
			imageUri={photo_url}
			data={ingredients}
			keyExtractor={(quantity: Quantity) =>
				quantity.ingredient.ingredientId.toString()
			}
			contentContainerStyle={{ paddingBottom: 70 }}
			renderItem={renderQuantityCard}
			ListHeaderComponent={
				<>
					<Text style={styles.title}>{title}</Text>
					<Text
						style={[
							styles.subtitle,
							{ color: colors.textSecondary }
						]}>
						{category.name} / {time} mins
					</Text>
					<Text style={[styles.header, { marginTop: 20 }]}>
						Ingredients
					</Text>
				</>
			}
			FloatingComponent={
				<PrimaryButton
					title='Cook This Dish'
					icon={buttonIcon()}
					onPress={() =>
						navigation.navigate('StepByStep', { recipe })
					}
				/>
			}
		/>
	);
};

const styles = StyleSheet.create({
	image: {
		aspectRatio: 1
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 24
	},
	subtitle: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	header: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	card: {
		margin: 0,
		padding: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderWidth: 0
	}
});

export default RecipeDetailScreen;
