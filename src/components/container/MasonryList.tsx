import React, { PropsWithChildren, ReactElement } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export type ItemInfo<T> = { item: T; index: number };

interface Props<T> {
	data: T[];
	renderItem: (element: ItemInfo<T>) => ReactElement;
}

const MasonryList = <T extends any>({
	data,
	renderItem
}: PropsWithChildren<Props<T>>) => {
	return (
		<ScrollView
			style={{ flexGrow: 0 }}
			removeClippedSubviews
			contentContainerStyle={styles.content}>
			{data.map((item, index) => renderItem({ item, index }))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

export default MasonryList;
