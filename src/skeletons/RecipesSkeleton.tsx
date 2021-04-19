import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CardDimens } from '../styling';

const RecipesSkeleton: FC = () => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item {...styles.container}>
				<SkeletonPlaceholder.Item {...styles.card} />
				<SkeletonPlaceholder.Item {...styles.card} />
				<SkeletonPlaceholder.Item {...styles.card} />
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginTop: 5,
		marginLeft: 10
	},
	card: {
		...CardDimens.recipe,
		marginHorizontal: 10,
		borderRadius: 10,
		marginBottom: 5,
		elevation: 3
	}
});

export default RecipesSkeleton;
