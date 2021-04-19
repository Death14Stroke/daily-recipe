import React, { FC } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useTheme } from '../../hooks/themes';
import { Spacing } from '../../styling';

interface Props {
	title: string;
}

const Header: FC<Props> = ({ title }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor={colors.background}
				barStyle='dark-content'
			/>
			<Text h3>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: Spacing.container,
		marginBottom: 10
	}
});

export default Header;
