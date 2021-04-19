import { Theme } from '@react-navigation/native';

export interface CustomTheme extends Theme {
	colors: Theme['colors'] & {
		textSecondary: string;
		light: string;
	};
}
