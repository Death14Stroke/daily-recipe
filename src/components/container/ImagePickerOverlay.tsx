import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Overlay, OverlayProps, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styling';
import ImageButton from '../view/ImageButton';

type Props = OverlayProps & {
	onCameraSelected: () => void;
	onGallerySelected: () => void;
};

const ImagePickerOverlay: FC<Props> = ({
	onCameraSelected,
	onGallerySelected,
	...overlayProps
}) => {
	return (
		<Overlay {...overlayProps} overlayStyle={styles.overlay}>
			<Text h4 style={styles.title}>
				Select image from
			</Text>
			<View style={styles.container}>
				<ImageButton
					title='Camera'
					icon={color => (
						<Ionicons name='camera' size={50} color={color} />
					)}
					onPress={onCameraSelected}
				/>
				<Divider style={styles.divider} />
				<ImageButton
					title='Gallery'
					icon={color => (
						<Ionicons name='ios-images' size={50} color={color} />
					)}
					onPress={onGallerySelected}
				/>
			</View>
		</Overlay>
	);
};

const styles = StyleSheet.create({
	divider: {
		height: '100%',
		width: 2,
		backgroundColor: Colors.blackPearl,
		marginBottom: 120
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	overlay: {
		padding: 0,
		borderRadius: 20,
		overflow: 'hidden'
	},
	title: {
		paddingHorizontal: 20,
		paddingVertical: 10
	}
});

export default ImagePickerOverlay;
