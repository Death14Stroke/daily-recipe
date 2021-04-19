import React, { FC, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Input } from 'react-native-elements';
import _ from 'lodash';
import { useTrackErrors } from '../../hooks/errors';
import { validateEmail, validatePassword } from '../../hooks/validation';
import { PrimaryButton } from '../view';

export type FormInput = { email: string; password: string };

interface Props {
	submitTitle: string;
	onSubmit: (input: FormInput) => void;
	containerStyle?: StyleProp<ViewStyle>;
}

const LoginForm: FC<Props> = ({ submitTitle, onSubmit, containerStyle }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { errors, updateErrors } = useTrackErrors();

	return (
		<View style={containerStyle}>
			<Input
				placeholder='Email'
				label='Email'
				autoCapitalize='none'
				autoCompleteType='email'
				autoCorrect={false}
				value={email}
				keyboardType='email-address'
				onChangeText={email => {
					updateErrors({ email: validateEmail(email) });
					setEmail(email);
				}}
				errorMessage={errors['email']}
			/>
			<Input
				placeholder='Password'
				label='Password'
				secureTextEntry
				autoCapitalize='none'
				autoCompleteType='password'
				autoCorrect={false}
				value={password}
				onChangeText={password => {
					updateErrors({ password: validatePassword(password) });
					setPassword(password);
				}}
				errorMessage={errors['password']}
			/>
			<PrimaryButton
				title={submitTitle}
				onPress={() => {
					updateErrors({
						email: validateEmail(email),
						password: validatePassword(password)
					});

					if (_.isEmpty(errors)) {
						onSubmit({ email, password });
					}
				}}
				containerStyle={styles.submit}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	submit: {
		marginTop: 30
	}
});

export default LoginForm;
