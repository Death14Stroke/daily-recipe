import React, { FC, useEffect, useRef, useState } from 'react';
import {
	ImageBackground,
	View,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	Image,
	Animated
} from 'react-native';
import { Text } from 'react-native-elements';
import { RouteProp } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { RootStackParamList } from '../../App';
import { PrimaryButton } from '../components/view';
import { useCameraPicture } from '../hooks/imagepickers';
import { useTheme } from '../hooks/themes';

interface Props {
	route: RouteProp<RootStackParamList, 'Share'>;
}

const ShareScreen: FC<Props> = ({ route }) => {
	const {
		recipe: { photo_url }
	} = route.params;
	const { colors } = useTheme();
	const takePicture = useCameraPicture();
	const [uri, setUri] = useState<string>();
	const translateTextY = useRef(new Animated.Value(200)).current;
	const translateButtonY = useRef(new Animated.Value(50)).current;
	const rotateValue = useRef(new Animated.Value(0)).current;
	const rotateString = rotateValue.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ['90deg', '180deg', '0deg']
	});

	const shareImage = async () => {
		if (!(await Sharing.isAvailableAsync()) || !uri) {
			alert(`Uh oh, sharing isn't available on your platform`);
			return;
		}

		await Sharing.shareAsync(uri);
	};

	useEffect(() => {
		Animated.spring(translateTextY, {
			toValue: 0,
			useNativeDriver: true
		}).start();
		Animated.spring(rotateValue, {
			toValue: 1,
			useNativeDriver: true
		}).start();
	}, []);

	return (
		<ImageBackground source={{ uri: photo_url }} style={{ flex: 1 }}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<View style={styles.container}>
				{uri ? (
					<View style={styles.cameraContainer}>
						<Image source={{ uri }} style={styles.image} />
					</View>
				) : (
					<Animated.View
						style={[
							styles.cameraContainer,
							{ transform: [{ rotate: rotateString }] }
						]}>
						<TouchableOpacity
							onPress={async () => {
								try {
									let uri = await takePicture();
									setUri(uri);
									Animated.spring(translateButtonY, {
										toValue: 0,
										useNativeDriver: true
									}).start();
								} catch (err) {
									console.log(err);
								}
							}}>
							<View
								style={[
									styles.cameraBox,
									{ borderColor: colors.light }
								]}>
								<Ionicons
									name='camera'
									size={24}
									color={colors.light}
								/>
								<Text style={{ color: colors.light }}>
									Take a photo
								</Text>
							</View>
						</TouchableOpacity>
					</Animated.View>
				)}
				<Animated.View
					style={[
						styles.textContainer,
						{ transform: [{ translateY: translateTextY }] }
					]}>
					<Text h2 style={{ color: colors.light }}>
						Congrats!
					</Text>
					<Text style={{ color: colors.light }}>
						Tell other users and your friends how delicious the dish
						turned out.
					</Text>
				</Animated.View>
				{uri && (
					<Animated.View
						style={{
							transform: [{ translateY: translateButtonY }]
						}}>
						<PrimaryButton
							title='Share'
							icon={
								<Ionicons
									name='share-social'
									size={24}
									color={colors.light}
								/>
							}
							iconRight
							onPress={shareImage}
						/>
					</Animated.View>
				)}
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	cameraBox: {
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 20,
		borderStyle: 'dashed',
		alignSelf: 'center',
		paddingVertical: 20,
		paddingHorizontal: 5,
		backgroundColor: '#00000033'
	},
	cameraContainer: {
		...StyleSheet.absoluteFillObject,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 15
	},
	image: {
		width: 300,
		height: 300,
		alignSelf: 'center',
		borderRadius: 20
	},
	textContainer: {
		marginVertical: 20,
		backgroundColor: '#00000033',
		padding: 10,
		borderRadius: 10
	}
});

export default ShareScreen;
