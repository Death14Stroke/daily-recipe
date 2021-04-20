import React, { FC, memo, useContext } from 'react';
import {
	View,
	StyleSheet,
	ViewStyle,
	StyleProp,
	TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { CardDimens, GlobalStyles } from '../../styling';
import TouchableShrink from '../container/TouchableShrink';
import { Recipe } from '../../models/';
import TextIcon from './TextIcon';
import { RecipesContext } from '../../context';

interface Props {
	recipe: Recipe;
	containerStyle?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

const RecipeCard: FC<Props> = ({ recipe, containerStyle, onPress }) => {
	const { title, time, photo_url, category, isBookmarked } = recipe;
	const {
		actions: { bookmarkRecipe }
	} = useContext(RecipesContext);

	return (
		<View style={[containerStyle, { elevation: 3 }]}>
			<TouchableShrink onPress={onPress} scaleFrom={1} scaleTo={0.95}>
				<Card containerStyle={[GlobalStyles.card, styles.container]}>
					<Card.Image
						containerStyle={styles.image}
						source={{ uri: photo_url }}
					/>
					<View style={{ padding: 10 }}>
						<Card.Title
							style={{ alignSelf: 'flex-start', fontSize: 18 }}>
							{title}
						</Card.Title>
						<TextIcon
							icon={({ color, size, style }) => (
								<Ionicons
									name='time-outline'
									color={color}
									size={size}
									style={style}
								/>
							)}
							title={`${time} mins`}
						/>
						<TextIcon
							icon={({ color, size, style }) => (
								<Ionicons
									name='fast-food-outline'
									color={color}
									size={size}
									style={style}
								/>
							)}
							title={category.name}
						/>
					</View>
					<TouchableOpacity
						style={styles.bookmark}
						onPress={() => bookmarkRecipe(recipe)}>
						{isBookmarked ? (
							<Ionicons name='heart' size={24} color='red' />
						) : (
							<Ionicons
								name='heart-outline'
								size={24}
								color='red'
							/>
						)}
					</TouchableOpacity>
				</Card>
			</TouchableShrink>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		elevation: 3,
		height: CardDimens.recipe.height
	},
	image: {
		borderTopStartRadius: 10,
		borderTopEndRadius: 10
	},
	bookmark: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginRight: 10,
		marginBottom: 10
	}
});

export default memo(
	RecipeCard,
	(prevProps, nextProps) =>
		prevProps.recipe.recipeId === nextProps.recipe.recipeId &&
		prevProps.recipe.isBookmarked === nextProps.recipe.isBookmarked
);
