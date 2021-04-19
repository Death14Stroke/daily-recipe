import React, { FC, useRef } from 'react';
import {
	TouchableWithoutFeedback,
	Animated,
	ViewStyle,
	StyleProp
} from 'react-native';

interface Props {
	onPress?: () => void;
	scaleFrom: number;
	scaleTo: number;
	containerStyle?: StyleProp<ViewStyle>;
}

const TouchableShrink: FC<Props> = ({
	onPress,
	children,
	scaleFrom,
	scaleTo,
	containerStyle
}) => {
	const scaleAnimated = useRef(new Animated.Value(0)).current;

	return (
		<TouchableWithoutFeedback
			onPress={onPress}
			onPressIn={() => pressInAnimation(scaleAnimated)}
			onPressOut={() => pressOutAnimation(scaleAnimated)}>
			<Animated.View
				style={[
					getScaleTransformationStyle(
						scaleAnimated,
						scaleFrom,
						scaleTo
					),
					containerStyle
				]}>
				{children}
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

const getScaleTransformationStyle = (
	animated: Animated.Value,
	startSize: number,
	endSize: number
): Animated.WithAnimatedObject<ViewStyle> => {
	const interpolation = animated.interpolate({
		inputRange: [0, 1],
		outputRange: [startSize, endSize]
	});

	return {
		transform: [{ scale: interpolation }]
	};
};

const pressInAnimation = (animated: Animated.Value, duration: number = 150) => {
	animated.setValue(0);
	Animated.timing(animated, {
		toValue: 1,
		duration,
		useNativeDriver: true
	}).start();
};

const pressOutAnimation = (
	animated: Animated.Value,
	duration: number = 150
) => {
	animated.setValue(1);
	Animated.timing(animated, {
		toValue: 0,
		duration,
		useNativeDriver: true
	}).start();
};

export default TouchableShrink;
