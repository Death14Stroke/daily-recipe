import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import { useTheme } from '../../hooks/themes';
import { Colors } from '../../styling';

type Props = ButtonProps;

const SecondaryButton: FC<Props> = ({ containerStyle, ...props }) => {
	const { colors } = useTheme();

	return (
		<View style={containerStyle}>
			<Button
				{...props}
				type='outline'
				raised
				buttonStyle={styles.button}
				containerStyle={styles.buttonContainer}
				titleStyle={{ color: colors.text }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 20,
		borderColor: Colors.regentGray
	},
	buttonContainer: {
		borderRadius: 20
	}
});

export default SecondaryButton;
