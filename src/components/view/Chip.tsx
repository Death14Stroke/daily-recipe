import React, { FC } from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native';
import { Colors, Spacing } from '../../styling';
import { useTheme } from '../../hooks/themes';

interface Props {
	label: string;
	selected?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

const Chip: FC<Props> = ({
	label,
	selected = false,
	containerStyle,
	onPress
}) => {
	const { colors } = useTheme();
	const selectedChipStyle = {
		backgroundColor: colors.primary,
		borderColor: colors.primary
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={[
					styles.chip,
					containerStyle,
					selected
						? [styles.selectedChip, selectedChipStyle]
						: styles.normalChip
				]}>
				<Text style={{ color: selected ? colors.light : colors.text }}>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	chip: {
		borderRadius: 50,
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignSelf: 'baseline'
	},
	normalChip: {
		borderColor: Colors.submarine
	},
	selectedChip: {
		elevation: Spacing.elevation
	},
	text: {
		fontWeight: 'bold'
	}
});

export default Chip;
