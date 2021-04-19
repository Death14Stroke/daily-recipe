import React, { PropsWithChildren } from 'react';
import {
	FlatList,
	ListRenderItem,
	StyleProp,
	View,
	ViewStyle
} from 'react-native';
import _ from 'lodash';

interface Props<T> {
	data: T[];
	gridSize: number;
	renderItem: ListRenderItem<T>;
	keyExtractor: (item: T, index: number) => string;
	containerStyle?: StyleProp<ViewStyle>;
}

const HorizontalGridList = <T extends any>(
	props: PropsWithChildren<Props<T>>
) => {
	const { data, gridSize, renderItem, keyExtractor, containerStyle } = props;
	const groupedData = _.chunk(data, gridSize);

	const renderGroupItem: ListRenderItem<T[]> = entry => {
		const { item, index } = entry;

		return (
			<View style={{ flexDirection: 'column' }}>
				{item.map(element => {
					return (
						<View key={keyExtractor(element, index)}>
							{renderItem({ ...entry, item: element })}
						</View>
					);
				})}
			</View>
		);
	};

	return (
		<FlatList
			data={groupedData}
			horizontal
			contentContainerStyle={{ paddingHorizontal: 10 }}
			showsHorizontalScrollIndicator={false}
			renderItem={renderGroupItem}
			keyExtractor={(item, index) =>
				`${index.toString()}_${keyExtractor(
					item[0],
					index / gridSize + (index % gridSize)
				)}`
			}
			style={[{ flexGrow: 0 }, containerStyle]}
		/>
	);
};

export default HorizontalGridList;
