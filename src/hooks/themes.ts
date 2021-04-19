import { useTheme as useNavigationTheme } from '@react-navigation/native';
import { CustomTheme } from '../models';

export const useTheme = () => {
	return useNavigationTheme() as CustomTheme;
};
