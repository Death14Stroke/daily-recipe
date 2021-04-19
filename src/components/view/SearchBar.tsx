import React, { FC } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TouchableOpacity,
	TextInputProps
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styling';
import { useTheme } from '../../hooks/themes';

type Props = TextInputProps & {
	containerStyle?: StyleProp<ViewStyle>;
	onFilterPress?: () => void;
};

const SearchBar: FC<Props> = props => {
	const { containerStyle, onFilterPress } = props;
	const { colors } = useTheme();

	return (
		<View style={[styles.container, containerStyle]}>
			<Feather name='search' size={24} color={colors.textSecondary} />
			<TextInput
				{...props}
				placeholderTextColor={colors.textSecondary}
				style={[styles.input, { color: colors.text }]}
			/>
			<TouchableOpacity onPress={onFilterPress}>
				<Ionicons
					name='filter'
					size={24}
					color={colors.textSecondary}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: Colors.athensGray,
		borderRadius: 50,
		padding: 10
	},
	input: {
		flexGrow: 1,
		marginHorizontal: 15
	}
});

export default SearchBar;
