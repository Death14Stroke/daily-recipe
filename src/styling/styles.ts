import { StyleSheet } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Colors } from './colors';
import { Spacing } from './spacing';

const HEADER_HEIGHT = 50;

export const headerOptions: StackNavigationOptions = {
	headerStyle: {
		elevation: 0,
		backgroundColor: Colors.blackHaze
	},
	headerTitle: ''
};

export const transparentHeaderOptions: StackNavigationOptions = {
	headerTransparent: true,
	headerTitle: '',
	headerTintColor: 'white'
};

export const GlobalStyles = StyleSheet.create({
	tabScreenContainer: {
		flex: 1,
		marginTop: HEADER_HEIGHT
	},
	card: {
		margin: 0,
		padding: 0,
		borderWidth: 0,
		elevation: 5,
		borderRadius: Spacing.corner
	}
});
