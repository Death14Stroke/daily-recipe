import React, { FC } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/themes';
import { Quantity } from '../../models';

interface Props {
	quantity: Quantity;
}

const QuantityCard: FC<Props> = ({ quantity }) => {
	const {
		ingredient: { photo_url, name },
		amount
	} = quantity;
	const { colors } = useTheme();

	return (
		<View style={{ flexDirection: 'row' }}>
			<Image style={styles.image} source={{ uri: photo_url }} />
			<View style={styles.textContainer}>
				<Text style={styles.title}>{name}</Text>
				<Text style={[styles.amount, { color: colors.textSecondary }]}>
					{amount}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 50,
		aspectRatio: 1
	},
	title: {
		textAlignVertical: 'center',
		fontWeight: 'bold',
		fontSize: 16,
		marginStart: 15
	},
	amount: {
		textAlignVertical: 'center',
		textAlign: 'right',
		flexWrap: 'wrap',
		flex: 1,
		marginLeft: 5
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export default QuantityCard;
