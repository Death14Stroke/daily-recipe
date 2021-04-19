import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/themes';
import { Spacing } from '../../styling';

interface Props {
	title: string;
	onPress?: () => void;
}

const HeaderTextOption: FC<Props> = ({ title, onPress }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Text style={{ color: colors.primary }}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		marginEnd: Spacing.container
	}
});

export default HeaderTextOption;
