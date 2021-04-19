import React, { FC, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../App';
import { Spacing } from '../styling';
import { useTheme } from '../hooks/themes';
import { validateUsername } from '../hooks/validation';
import { useTrackErrors } from '../hooks/errors';
import { signupWithEmail } from '../hooks/auth';
import LoginForm, { FormInput } from '../components/container/LoginForm';
import { Header, HeaderTextOption } from '../components/header';
import { ProfileAvatar, ProgressOverlay } from '../components/view';

interface Props {
	navigation: StackNavigationProp<RootStackParamList, 'Signup'>;
}

const SignupScreen: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();
	const [userName, setUserName] = useState('');
	const [loading, setLoading] = useState(false);
	const [uri, setUri] = useState<string>();
	const { errors, updateErrors } = useTrackErrors();

	const signupUser = async ({ email, password }: FormInput) => {
		setLoading(true);

		try {
			await signupWithEmail({ email, password, userName, photoURL: uri });
			navigation.reset({
				index: 0,
				routes: [{ name: 'Home' }]
			});
		} catch (err) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<HeaderTextOption
						title='Log in'
						onPress={() => navigation.replace('Login')}
					/>
				);
			}
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Header title='Welcome to Daily Recipe App' />
			<KeyboardAwareScrollView
				scrollEnabled={false}
				resetScrollToCoords={{ x: 0, y: 0 }}>
				<View style={styles.container}>
					<Text
						style={[
							{ color: colors.textSecondary },
							styles.description
						]}>
						Create a new account
					</Text>
					<View style={styles.inner}>
						<View style={styles.form}>
							<ProfileAvatar
								uri={uri}
								onCameraSelected={setUri}
								onGallerySelected={setUri}
							/>
							<Input
								label='Username'
								placeholder='What should we call you?'
								autoCapitalize='none'
								autoCompleteType='name'
								autoCorrect={false}
								value={userName}
								onChangeText={userName => {
									updateErrors({
										userName: validateUsername(userName)
									});
									setUserName(userName);
								}}
								errorMessage={errors['userName']}
							/>
							<LoginForm
								submitTitle='Sign up'
								onSubmit={signupUser}
							/>
						</View>
						<ProgressOverlay isVisible={loading} />
					</View>
				</View>
			</KeyboardAwareScrollView>
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
	},
	inner: {
		flex: 1
	}
});

export default SignupScreen;
