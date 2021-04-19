import React, { FC } from 'react';
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	StyleProp,
	ViewStyle
} from 'react-native';
import { useTheme } from '../../hooks/themes';

interface Props {
	position: number;
	selected: boolean;
	onPress: () => void;
	containerStyle?: StyleProp<ViewStyle>;
}

const PageIndicator: FC<Props> = ({
	position,
	selected,
	onPress,
	containerStyle
}) => {
	const { colors } = useTheme();
	const color = selected ? colors.text : colors.textSecondary;

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					styles.container,
					containerStyle,
					{ borderColor: color }
				]}>
				<Text style={{ color }}>{position}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderWidth: 1,
		aspectRatio: 1,
		width: 30,
		borderRadius: 15,
		justifyContent: 'center'
	}
});

export default PageIndicator;
