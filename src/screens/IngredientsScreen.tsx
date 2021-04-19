import React, { FC, useContext } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	ListRenderItem,
	StatusBar,
	StyleSheet,
	View
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PagedList } from '@death14stroke/react-native-paged-list';
import { RootStackParamList } from '../../App';
import { IngredientsContext } from '../context';
import { Ingredient } from '../models';
import { useMultiSelection } from '../hooks/selection';
import { Header } from '../components/header';
import { IngredientCard, PrimaryButton } from '../components/view';
import { TouchableShrink } from '../components/container';

interface Props {
	navigation: StackNavigationProp<RootStackParamList, 'Ingredients'>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const IngredientsScreen: FC<Props> = ({ navigation }) => {
	const {
		state: { ingredients },
		actions: { fetchIngredients }
	} = useContext(IngredientsContext);
	const [selected, updateSelected, isSelected] = useMultiSelection<number>(
		[]
	);

	const renderIngredient: ListRenderItem<Ingredient> = ({ item }) => {
		const { ingredientId } = item;

		return (
			<TouchableShrink
				onPress={() => {
					updateSelected(ingredientId);
				}}
				scaleFrom={1}
				scaleTo={0.95}>
				<IngredientCard
					ingredient={item}
					selected={isSelected(ingredientId)}
					containerStyle={{
						width: (SCREEN_WIDTH - 60) / 3,
						marginHorizontal: 10
					}}
				/>
			</TouchableShrink>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<StatusBar translucent backgroundColor='transparent' />
			<Header title='Select Ingredients' />
			<PagedList
				data={ingredients}
				firstPage={0}
				extraData={selected}
				loadData={async page => {
					return await fetchIngredients({ page, pageSize: 18 });
				}}
				style={{ flexGrow: 0, marginHorizontal: 10 }}
				keyExtractor={({ ingredientId }) => `ing_${ingredientId}`}
				renderItem={renderIngredient}
				numColumns={3}
				contentContainerStyle={{ paddingBottom: 70 }}
				showsVerticalScrollIndicator={false}
				columnWrapperStyle={{
					justifyContent: 'space-evenly',
					marginVertical: 10
				}}
				ListFooterComponent={
					<View style={styles.loadingContainer}>
						<ActivityIndicator
							color='red'
							style={{ margin: 15 }}
							size='large'
						/>
					</View>
				}
			/>
			{selected.size > 0 && (
				<PrimaryButton
					title={`Filter ${selected.size} ingredients`}
					containerStyle={styles.buttonContainer}
					onPress={() =>
						navigation.navigate('SearchResults', {
							ingredients: [...selected]
						})
					}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		margin: 20
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'column'
	}
});

export default IngredientsScreen;
