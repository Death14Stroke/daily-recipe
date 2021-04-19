import * as ImagePicker from 'expo-image-picker';

export const useCameraPicture = () => {
	const askPermissions = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== 'granted') {
			return Promise.reject({ message: 'Camera permission not granted' });
		}
	};

	const openCamera = async (): Promise<string | undefined> => {
		const result = await ImagePicker.launchCameraAsync();
		if (!result.cancelled) {
			return result.uri;
		}
	};

	const takePicture = async () => {
		try {
			await askPermissions();
			return await openCamera();
		} catch (err) {
			return Promise.reject(err.message);
		}
	};

	return takePicture;
};

export const useGalleryPicture = () => {
	const askPermissions = async () => {
		const {
			status
		} = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			return Promise.reject({ message: 'Media permission not granted' });
		}
	};

	const openGallery = async (): Promise<string | undefined> => {
		const result = await ImagePicker.launchImageLibraryAsync();
		if (!result.cancelled) {
			return result.uri;
		}
	};

	const pickPicture = async () => {
		try {
			await askPermissions();
			return await openGallery();
		} catch (err) {
			return Promise.reject(err.message);
		}
	};

	return pickPicture;
};
