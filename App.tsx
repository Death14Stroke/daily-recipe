import React, { FC, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';
import firebaseConfig from './firebase.config';
import {
	ExploreScreen,
	FilterScreen,
	IngredientsScreen,
	LoginScreen,
	ProfileScreen,
	RecipeDetailScreen,
	RecipesScreen,
	SearchResultsScreen,
	ShareScreen,
	SignupScreen,
	StepByStepScreen,
	WelcomeScreen
} from './src/screens';
import {
	RecipesProvider,
	IngredientsProvider,
	CategoriesProvider,
	PreferencesProvider
} from './src/context';
import {
	DayTheme,
	headerOptions,
	transparentHeaderOptions
} from './src/styling';
import { useTheme } from './src/hooks/themes';
import { BottomTabBar } from './src/components/tab';
import { Recipe } from './src/models';

export type RootStackParamList = {
	Welcome: undefined;
	Signup: undefined;
	Login: undefined;
	Home: undefined;
	RecipeDetail: { recipe: Recipe };
	StepByStep: { recipe: Recipe };
	Share: { recipe: Recipe };
	SearchResults: Partial<{
		query: string | undefined;
		dishTypes: number[] | undefined;
		cookTime: number | undefined;
		ingredients: number[] | undefined;
	}>;
	Ingredients: undefined;
	Filter: undefined;
};

export type BottomTabParamList = {
	Recipes: undefined;
	Explore: undefined;
	Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const bottomTabs = () => {
	const { colors } = useTheme();

	return (
		<Tab.Navigator
			tabBar={props => <BottomTabBar {...props} />}
			tabBarOptions={{
				activeTintColor: colors.text,
				inactiveTintColor: colors.textSecondary
			}}>
			<Tab.Screen
				name='Recipes'
				component={RecipesScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name='local-dining'
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Tab.Screen
				name='Explore'
				component={ExploreScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name='search' size={size} color={color} />
					)
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name='user' size={size} color={color} />
					)
				}}
			/>
		</Tab.Navigator>
	);
};

const stackScreens = (initialRoute: keyof RootStackParamList) => {
	return (
		<Stack.Navigator initialRouteName={initialRoute}>
			<Stack.Screen
				name='Welcome'
				component={WelcomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Signup'
				component={SignupScreen}
				options={headerOptions}
			/>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={headerOptions}
			/>
			<Stack.Screen
				name='Home'
				options={{ headerShown: false }}
				component={bottomTabs}
			/>
			<Stack.Screen
				name='RecipeDetail'
				component={RecipeDetailScreen}
				options={transparentHeaderOptions}
			/>
			<Stack.Screen
				name='StepByStep'
				component={StepByStepScreen}
				options={transparentHeaderOptions}
			/>
			<Stack.Screen
				name='Share'
				component={ShareScreen}
				options={transparentHeaderOptions}
			/>
			<Stack.Screen
				name='SearchResults'
				component={SearchResultsScreen}
				options={headerOptions}
			/>
			<Stack.Screen
				name='Ingredients'
				component={IngredientsScreen}
				options={headerOptions}
			/>
			<Stack.Screen
				name='Filter'
				component={FilterScreen}
				options={headerOptions}
			/>
		</Stack.Navigator>
	);
};

const App: FC = () => {
	const [assets] = useAssets([require('./assets/video/welcome.mp4')]);
	const [user, setUser] = useState<firebase.User | null>();
	const [loading, setLoading] = useState(true);

	const getInitialRoute = (): keyof RootStackParamList => {
		if (user) {
			return 'Home';
		}

		return 'Welcome';
	};

	useEffect(() => {
		firebase.initializeApp(firebaseConfig);

		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	if (!assets || loading) {
		return <AppLoading />;
	}

	return (
		<SafeAreaProvider>
			<RecipesProvider>
				<IngredientsProvider>
					<CategoriesProvider>
						<PreferencesProvider>
							<NavigationContainer theme={DayTheme}>
								{stackScreens(getInitialRoute())}
							</NavigationContainer>
						</PreferencesProvider>
					</CategoriesProvider>
				</IngredientsProvider>
			</RecipesProvider>
		</SafeAreaProvider>
	);
};

export default App;
