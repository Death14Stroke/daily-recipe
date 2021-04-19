import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../App';
import { Colors, Spacing } from '../styling';
import { PrimaryButton } from '../components/view';
import { useTheme } from '../hooks/themes';

interface Props {
	navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
}

const WelcomeScreen: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle='light-content'
				translucent
				backgroundColor='transparent'
			/>
			<Video
				style={styles.backgroundVideo}
				source={require('../../assets/video/welcome.mp4')}
				resizeMode='cover'
				shouldPlay
				isLooping
				isMuted
			/>
			<Text h3 style={styles.text}>
				Welcome to Daily Recipe App
			</Text>
			<Text style={[styles.text, styles.description]}>
				Cook new dishes, share them with friends, make your loved ones
				happy!
			</Text>
			<PrimaryButton
				title='Sign up with Email'
				iconRight={false}
				icon={
					<Ionicons
						name='mail'
						size={24}
						color={colors.light}
						style={{ marginRight: Spacing.buttonIcon }}
					/>
				}
				onPress={() => navigation.navigate('Signup')}
			/>
			<View style={styles.loginContainer}>
				<Text style={styles.text}>Already have an account? </Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text style={[styles.text, styles.underline]}>Log in</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: Spacing.container
	},
	backgroundVideo: StyleSheet.absoluteFillObject,
	underline: {
		textDecorationLine: 'underline'
	},
	text: {
		color: Colors.blackHaze
	},
	loginContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: Spacing.container
	},
	description: {
		marginVertical: Spacing.container
	}
});

export { WelcomeScreen };

export default WelcomeScreen;
