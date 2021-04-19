import React, { FC, memo } from 'react';
import { View, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { GlobalStyles } from '../../styling';
import TouchableShrink from '../container/TouchableShrink';
import { Category } from '../../models';

interface Props {
	category: Category;
	containerStyle?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

const CategoryCard: FC<Props> = ({ category, containerStyle, onPress }) => {
	const { photo_url, name } = category;

	return (
		<View style={[containerStyle, { flex: 1 }]}>
			<TouchableShrink onPress={onPress} scaleFrom={1} scaleTo={0.95}>
				<Card containerStyle={[GlobalStyles.card, styles.card]}>
					<Avatar
						rounded
						source={{ uri: photo_url }}
						size='large'
						containerStyle={styles.avatar}
					/>
					<Card.Title>{name}</Card.Title>
				</Card>
			</TouchableShrink>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: 'center'
	},
	avatar: {
		marginTop: 10,
		alignSelf: 'center',
		marginBottom: 10
	}
});

export default memo(CategoryCard, (prevProps, nextProps) => {
	return prevProps.category.id === nextProps.category.id;
});
