import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { CardDimens } from '../styling';

const IngredientsSkeleton: FC = () => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item {...styles.row} marginTop={5}>
				<SkeletonPlaceholder.Item {...styles.card} />
				<SkeletonPlaceholder.Item {...styles.card} />
				<SkeletonPlaceholder.Item {...styles.card} />
			</SkeletonPlaceholder.Item>
			<SkeletonPlaceholder.Item {...styles.row}>
				<SkeletonPlaceholder.Item {...styles.card} />
				<SkeletonPlaceholder.Item {...styles.card} />
				<SkeletonPlaceholder.Item {...styles.card} />
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginBottom: 15,
		marginStart: 10
	},
	card: {
		marginHorizontal: 10,
		...CardDimens.ingredient,
		elevation: 3,
		borderRadius: 10
	}
});

export default IngredientsSkeleton;
