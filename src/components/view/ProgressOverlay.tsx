import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import LottieView from 'lottie-react-native';

interface Props {
	isVisible: boolean;
}

const ProgressOverlay: FC<Props> = ({ isVisible }) => {
	return (
		<Overlay
			isVisible={isVisible}
			transparent
			overlayStyle={styles.overlay}>
			<LottieView
				source={require('../../../assets/anim/loading.json')}
				autoPlay
				loop
				style={styles.lottie}
			/>
		</Overlay>
	);
};

const styles = StyleSheet.create({
	lottie: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: 'transparent'
	},
	overlay: {
		backgroundColor: 'transparent',
		elevation: 0
	}
});

export default ProgressOverlay;
