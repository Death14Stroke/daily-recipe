import React, { FC, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/themes';
import { useCameraPicture, useGalleryPicture } from '../../hooks/imagepickers';
import ImagePickerOverlay from '../container/ImagePickerOverlay';
import { Colors } from '../../styling';

interface Props {
	uri?: string | null;
	onCameraSelected: (uri?: string) => void;
	onGallerySelected: (uri?: string) => void;
}

const ProfileAvatar: FC<Props> = ({
	uri,
	onCameraSelected,
	onGallerySelected
}) => {
	const { colors } = useTheme();
	const [overlay, setOverlay] = useState(false);
	const takePicture = useCameraPicture();
	const pickPicture = useGalleryPicture();

	return (
		<>
			<View style={styles.avatarContainer}>
				<Avatar
					rounded
					title='ME'
					iconStyle={{ backgroundColor: Colors.sushi }}
					source={uri ? { uri } : require('../../../assets/user.png')}
					size='xlarge'
				/>
				<TouchableOpacity
					style={[styles.badge, { backgroundColor: colors.primary }]}
					onPress={() => setOverlay(true)}>
					<Ionicons name='camera' size={24} color={colors.light} />
				</TouchableOpacity>
			</View>
			{overlay && (
				<ImagePickerOverlay
					isVisible={overlay}
					onBackdropPress={() => setOverlay(false)}
					onCameraSelected={async () => {
						setOverlay(false);
						let uri = await takePicture();
						onCameraSelected(uri);
					}}
					onGallerySelected={async () => {
						setOverlay(false);
						let uri = await pickPicture();
						onGallerySelected(uri);
					}}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	avatarContainer: {
		alignSelf: 'center',
		marginBottom: 5
	},
	badge: {
		borderRadius: 300,
		padding: 5,
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginBottom: 10
	}
});

export default ProfileAvatar;
