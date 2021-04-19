import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import { useTheme } from '../../hooks/themes';

type Props = ButtonProps;

const PrimaryButton: FC<Props> = ({ iconRight = true, ...props }) => {
	const { colors } = useTheme();

	return (
		<View style={props.containerStyle}>
			<Button
				{...props}
				iconRight={iconRight}
				type='solid'
				raised
				buttonStyle={{ backgroundColor: colors.primary }}
				containerStyle={styles.buttonContainer}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 20
	}
});

export default PrimaryButton;
