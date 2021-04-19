import React, { FC, useRef } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Animated,
	Dimensions
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import BottomMenuItem from './BottomMenuItem';
import { Colors, Spacing } from '../../styling';

const BottomTabBar: FC<BottomTabBarProps> = ({
	state,
	descriptors,
	navigation,
	activeTintColor = Colors.sushi,
	inactiveTintColor = Colors.regentGray
}) => {
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	const totalWidth = Dimensions.get('window').width;
	const tabWidth = totalWidth / state.routes.length;
	const translateValue = useRef(new Animated.Value(0)).current;
	const { colors } = useTheme();

	return (
		<View style={styles.tabContainer}>
			<Animated.View
				style={[
					styles.slider,
					{
						transform: [{ translateX: translateValue }],
						width: tabWidth - 20,
						backgroundColor: colors.primary
					}
				]}
			/>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true
					});
					Animated.spring(translateValue, {
						toValue: index * tabWidth,
						velocity: 10,
						useNativeDriver: true
					}).start();

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key
					});
				};

				const { tabBarIcon } = options;

				return (
					<TouchableOpacity
						key={label.toString()}
						accessibilityRole='button'
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1 }}>
						<BottomMenuItem
							icon={
								tabBarIcon &&
								tabBarIcon({
									focused: isFocused,
									color: isFocused
										? activeTintColor
										: inactiveTintColor,
									size: 24
								})
							}
							color={
								isFocused ? activeTintColor : inactiveTintColor
							}
							title={label.toString()}
						/>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	tabContainer: {
		flexDirection: 'row',
		paddingVertical: 5,
		shadowOffset: {
			width: 0,
			height: -1
		},
		shadowOpacity: 0.1,
		shadowRadius: 4.0,
		backgroundColor: 'white',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		elevation: 10,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	},
	slider: {
		height: 3,
		position: 'absolute',
		top: 0,
		left: 10,
		borderRadius: Spacing.corner,
		width: 50
	}
});

export default BottomTabBar;
