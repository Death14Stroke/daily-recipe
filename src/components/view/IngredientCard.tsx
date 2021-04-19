import React, { FC, memo } from 'react';
import { StyleProp, Image, ViewStyle, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { GlobalStyles } from '../../styling';
import { Ingredient } from '../../models';
import { useTheme } from '../../hooks/themes';

interface Props {
	ingredient: Ingredient;
	containerStyle?: StyleProp<ViewStyle>;
	selected?: boolean;
}

const IngredientCard: FC<Props> = ({
	ingredient,
	containerStyle,
	selected = false
}) => {
	const { name, photo_url } = ingredient;
	const { colors } = useTheme();

	return (
		<Card
			containerStyle={[
				GlobalStyles.card,
				styles.container,
				selected && {
					borderWidth: 2,
					borderColor: colors.primary
				},
				containerStyle
			]}>
			<Image
				style={styles.image}
				source={{ uri: photo_url }}
				resizeMode='contain'
			/>
			<Card.Title style={styles.title}>{name}</Card.Title>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		elevation: 3,
		paddingHorizontal: 7
	},
	image: {
		height: 100,
		width: 100,
		alignSelf: 'center'
	},
	title: {
		height: 45,
		lineHeight: 15,
		textAlignVertical: 'center',
		fontSize: 14,
		flexWrap: 'wrap'
	}
});

export default memo(IngredientCard, (prevProps, nextProps) => {
	return (
		prevProps.ingredient.ingredientId ===
			nextProps.ingredient.ingredientId &&
		prevProps.selected === nextProps.selected
	);
});
