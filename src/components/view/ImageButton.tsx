import React, { FC, ReactElement, ReactNode } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TouchableOpacityProps
} from 'react-native';
import { useTheme } from '../../hooks/themes';

type Props = TouchableOpacityProps & {
	icon: (color: string) => ReactElement | ReactNode;
	title: string;
};

const ImageButton: FC<Props> = ({ icon, title, ...touchableProps }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity {...touchableProps} style={styles.container}>
			<View>{icon(colors.primary)}</View>
			<Text style={[styles.title, { color: colors.primary }]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'center',
		paddingVertical: 20
	},
	title: {
		fontSize: 16,
		marginBottom: 20
	}
});

export default ImageButton;
