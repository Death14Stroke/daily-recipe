import React, {
	PropsWithChildren,
	ReactElement,
	useRef,
	useState
} from 'react';
import {
	StatusBar,
	View,
	StyleSheet,
	Image,
	FlatListProps,
	Animated
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import { useTheme } from '../../hooks/themes';

type Props<T> = FlatListProps<T> & {
	maxHeight: number;
	imageUri: string;
	FloatingComponent: ReactElement;
};

const CollapsingListHeader = <T extends any>(
	props: PropsWithChildren<Props<T>>
) => {
	const { maxHeight, imageUri, FloatingComponent, ...flatListProps } = props;
	const { colors } = useTheme();
	const HEADER_MIN_HEIGHT = useHeaderHeight() + 20;
	const HEADER_SCROLL_DISTANCE = maxHeight - HEADER_MIN_HEIGHT;
	const scrollY = useRef(new Animated.Value(0)).current;
	const footerY = useRef(new Animated.Value(60)).current;

	const [endReached, setEndReached] = useState(false);

	const headerHeight = scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [maxHeight, HEADER_MIN_HEIGHT],
		extrapolate: 'clamp'
	});

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<View style={{ flex: 1 }}>
				<Animated.FlatList<any>
					{...flatListProps}
					style={{
						flex: 1,
						backgroundColor: colors.background
					}}
					contentContainerStyle={[
						styles.scrollContainer,
						{ backgroundColor: colors.background },
						flatListProps.contentContainerStyle,
						{ paddingTop: maxHeight }
					]}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: false }
					)}
					onEndReachedThreshold={0.1}
					onEndReached={() => {
						if (!endReached) {
							Animated.spring(footerY, {
								toValue: 0,
								useNativeDriver: true
							}).start();
							setEndReached(true);
						}
					}}
				/>
				<Animated.View
					style={[
						styles.floatingContainer,
						{
							transform: [{ translateY: footerY }]
						}
					]}>
					{endReached && FloatingComponent}
				</Animated.View>
				<Animated.View
					style={[styles.header, { height: headerHeight }]}>
					<Image source={{ uri: imageUri }} style={{ flex: 1 }} />
					<View
						style={[
							styles.corners,
							{ backgroundColor: colors.background }
						]}
					/>
				</Animated.View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		paddingHorizontal: 15,
		paddingBottom: 15
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		overflow: 'hidden'
	},
	corners: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		height: 20
	},
	floatingContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		margin: 20
	}
});

export default CollapsingListHeader;
