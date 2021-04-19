import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-easy-toast';
import { RootStackParamList } from '../../App';
import { Spacing } from '../styling';
import { Header, HeaderTextOption } from '../components/header';
import LoginForm, { FormInput } from '../components/container/LoginForm';
import { ProgressOverlay } from '../components/view';
import { useTheme } from '../hooks/themes';
import { loginWithEmail } from '../hooks/auth';

interface Props {
	navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const LoginScreen: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();
	const [loading, setLoading] = useState(false);
	const toast = useRef<Toast>(null);

	const loginUser = async ({ email, password }: FormInput) => {
		setLoading(true);

		try {
			await loginWithEmail({ email, password });
			setLoading(false);
			toast.current?.show('Successfully logged in');
			navigation.reset({
				index: 0,
				routes: [{ name: 'Home' }]
			});
		} catch (err) {
			console.log(err.message);
			setLoading(false);
			toast.current?.show(err.message);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<HeaderTextOption
						title='Sign up'
						onPress={() => navigation.replace('Signup')}
					/>
				);
			}
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Header title='Welcome to Daily Recipe App' />
			<Text style={[{ color: colors.textSecondary }, styles.description]}>
				Log back into your account
			</Text>
			<LoginForm
				submitTitle='Log in'
				onSubmit={loginUser}
				containerStyle={styles.form}
			/>
			<ProgressOverlay isVisible={loading} />
			<Toast ref={toast} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	description: {
		margin: Spacing.container
	},
	form: {
		marginHorizontal: Spacing.container
	}
});

export default LoginScreen;
