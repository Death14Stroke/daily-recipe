import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import {
	FlatList,
	ListRenderItem,
	Text,
	View,
	StyleSheet,
	Image,
	StatusBar
} from 'react-native';
import { Card } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import _ from 'lodash';
import { RootStackParamList } from '../../App';
import { Colors } from '../styling';
import {
	PrimaryButton,
	SecondaryButton,
	PageIndicator
} from '../components/view';

interface Props {
	route: RouteProp<RootStackParamList, 'RecipeDetail'>;
	navigation: StackNavigationProp<RootStackParamList, 'RecipeDetail'>;
}

const StepByStepScreen: FC<Props> = ({ route, navigation }) => {
	const { recipe } = route.params;
	const { steps, photosArray } = recipe;
	const pages = _.range(steps.length);

	const [currentPage, setCurrentPage] = useState(0);
	const imageViewPager = useRef<ViewPager | null>(null);
	const stepsViewPager = useRef<ViewPager | null>(null);

	useEffect(() => {
		imageViewPager.current?.setPage(currentPage);
		stepsViewPager.current?.setPage(currentPage);
	}, [currentPage]);

	const renderPageIndicator: ListRenderItem<number> = ({ item }) => {
		return (
			<PageIndicator
				position={item + 1}
				selected={item === currentPage}
				onPress={() => {
					setCurrentPage(item);
				}}
				containerStyle={{ marginEnd: 7 }}
			/>
		);
	};

	const renderStep = (step: string): ReactElement => {
		return (
			<Text
				style={{
					marginHorizontal: 20,
					marginTop: 10,
					color: Colors.regentGray
				}}>
				{step}
			</Text>
		);
	};

	const nextButtonIcon = (): ReactElement => {
		return currentPage === pages.length - 1 ? (
			<MaterialIcons
				name='done'
				size={24}
				color='white'
				style={{ marginLeft: 10 }}
			/>
		) : (
			<Feather
				name='arrow-right'
				size={24}
				color='white'
				style={{ marginLeft: 10 }}
			/>
		);
	};

	const prevButtonIcon = (): ReactElement => {
		return (
			<Feather
				name='arrow-left'
				size={24}
				color={Colors.blackPearl}
				style={{ marginRight: 10 }}
			/>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<ViewPager
				style={{ flex: 1 }}
				scrollEnabled={false}
				ref={imageViewPager}>
				{_.times(steps.length, i => {
					return (
						<Image
							source={{
								uri: photosArray[i % photosArray.length]
							}}
							style={{ flex: 1 }}
						/>
					);
				})}
			</ViewPager>
			<Card
				containerStyle={styles.cardContainer}
				wrapperStyle={{ flex: 1 }}>
				<Card.Title h4 style={{ marginTop: 10 }}>
					Step {currentPage + 1}
				</Card.Title>
				<FlatList
					data={pages}
					keyExtractor={page => page.toString()}
					renderItem={renderPageIndicator}
					horizontal
					style={styles.pageIndicatorsList}
					extraData={currentPage}
				/>
				<ViewPager
					style={{ flex: 1 }}
					scrollEnabled={false}
					ref={stepsViewPager}>
					{steps.map((step, index) => {
						return <View key={index}>{renderStep(step)}</View>;
					})}
				</ViewPager>
				<View style={{ flexDirection: 'row' }}>
					{currentPage !== 0 && (
						<SecondaryButton
							containerStyle={{ flex: 1, margin: 10 }}
							title='Previous'
							icon={prevButtonIcon()}
							onPress={() => setCurrentPage(currentPage - 1)}
						/>
					)}
					<PrimaryButton
						containerStyle={{ flex: 1, margin: 10 }}
						title={
							currentPage === steps.length - 1
								? 'Finish cook'
								: 'Next step'
						}
						icon={nextButtonIcon()}
						onPress={() => {
							if (currentPage < steps.length - 1) {
								setCurrentPage(currentPage + 1);
							} else {
								navigation.navigate('Share', { recipe });
							}
						}}
					/>
				</View>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	pageIndicatorsList: {
		alignSelf: 'center',
		flexGrow: 0,
		marginBottom: 10
	},
	cardContainer: {
		flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		margin: 0,
		padding: 0,
		borderWidth: 0,
		marginTop: -22
	}
});

export default StepByStepScreen;
