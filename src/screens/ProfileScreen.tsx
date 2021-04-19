import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import {
	Text,
	StatusBar,
	View,
	StyleSheet,
	ListRenderItem,
	FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import Toast from 'react-native-easy-toast';
import { BottomTabParamList, RootStackParamList } from '../../App';
import { CardDimens, GlobalStyles, Spacing } from '../styling';
import { Header } from '../components/header';
import { PrimaryButton, ProfileAvatar, RecipeCard } from '../components/view';
import { signOut, updateProfile, useCurrentUser } from '../hooks/auth';
import { useTheme } from '../hooks/themes';
import { Recipe } from '../models';
import { RecipesContext } from '../context';

interface Props {
	navigation: CompositeNavigationProp<
		BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
		StackNavigationProp<RootStackParamList>
	>;
}

const ProfileScreen: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();
	const {
		state: { bookmarks },
		actions: { fetchBookmarks }
	} = useContext(RecipesContext);
	const [user, setUser] = useState(useCurrentUser());
	const toast = useRef<Toast>(null);

	console.log(
		'bookmarks:',
		bookmarks.map(
			r => `${r.title} ${r.isBookmarked} category: ${r.category}`
		)
	);

	const signOutUser = async () => {
		try {
			await signOut();
			navigation.reset({
				index: 0,
				routes: [{ name: 'Welcome' }]
			});
		} catch (err) {
			toast.current?.show(err.message);
			console.log(err.message);
		}
	};

	const _updateProfile = async (uri: string | undefined) => {
		try {
			await updateProfile({ photoURL: uri }, user => {
				setUser({ ...user });
			});
		} catch (err) {
			toast.current?.show(err.message);
			console.log(err.message);
		}
	};

	const renderRecipe: ListRenderItem<Recipe> = ({ item }) => {
		return (
			<RecipeCard
				recipe={item}
				containerStyle={styles.recipeContainer}
				onPress={() =>
					navigation.navigate('RecipeDetail', { recipe: item })
				}
			/>
		);
	};

	useEffect(() => {
		fetchBookmarks();
	}, []);

	if (user === null || user === undefined) {
		return <AppLoading />;
	}

	const { displayName, photoURL, email } = user;

	return (
		<SafeAreaView style={GlobalStyles.tabScreenContainer}>
			<StatusBar translucent backgroundColor='transparent' />
			<Header title='Profile' />
			<View style={styles.profileContainer}>
				<ProfileAvatar
					uri={photoURL}
					onCameraSelected={_updateProfile}
					onGallerySelected={_updateProfile}
				/>

				<View style={styles.textContainer}>
					<Text style={styles.username}>{displayName}</Text>
					<Text style={[{ color: colors.textSecondary }]}>
						{email}
					</Text>
				</View>
			</View>
			<Text style={styles.heading}>Favorites</Text>
			<FlatList
				data={bookmarks}
				keyExtractor={({ recipeId }) => `rec_${recipeId}`}
				renderItem={renderRecipe}
				horizontal
				contentContainerStyle={{ paddingHorizontal: 5 }}
				showsHorizontalScrollIndicator={false}
				style={styles.list}
			/>
			<View style={styles.buttonContainer}>
				<PrimaryButton title='Logout' onPress={signOutUser} />
			</View>
			<Toast ref={toast} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	profileContainer: {
		flexDirection: 'row',
		marginBottom: Spacing.container,
		marginHorizontal: Spacing.container
	},
	textContainer: {
		marginHorizontal: 15
	},
	username: {
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 5
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: Spacing.container
	},
	heading: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlignVertical: 'center',
		marginLeft: 15
	},
	recipeContainer: {
		...CardDimens.recipe,
		marginHorizontal: 10,
		marginBottom: 5
	},
	list: {
		flexGrow: 0,
		paddingTop: 5
	}
});

export default ProfileScreen;
