import React, { FC, ReactElement, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
	icon?: ReactElement | ReactNode;
	title: string;
	color: string;
}

const BottomMenuItem: FC<Props> = ({ icon, title, color }) => {
	return (
		<View style={styles.container}>
			{icon}
			<Text style={{ color }}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default BottomMenuItem;
