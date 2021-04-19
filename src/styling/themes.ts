import { DefaultTheme } from '@react-navigation/native';
import { CustomTheme } from '../models/CustomTheme';
import { Colors } from './colors';

export const DayTheme: CustomTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.sushi,
		text: Colors.blackPearl,
		card: Colors.blackHaze,
		background: Colors.blackHaze,
		textSecondary: Colors.submarine,
		light: Colors.blackHaze
	}
};
