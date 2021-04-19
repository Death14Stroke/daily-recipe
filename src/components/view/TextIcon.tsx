import React, { FC, ReactElement } from 'react';
import { Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/themes';

interface Props {
	icon: (props: {
		color: string;
		size: number;
		style: StyleProp<ViewStyle>;
	}) => ReactElement;
	title: string;
}

const TextIcon: FC<Props> = ({ icon, title }) => {
	const { colors } = useTheme();

	return (
		<View style={{ flexDirection: 'row' }}>
			{icon({ color: colors.primary, size: 14, style: styles.icon })}
			<Text style={[styles.text, { color: colors.textSecondary }]}>
				{title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		marginStart: 5,
		fontSize: 14,
		fontWeight: 'bold'
	},
	icon: {
		alignSelf: 'center'
	}
});

export default TextIcon;
