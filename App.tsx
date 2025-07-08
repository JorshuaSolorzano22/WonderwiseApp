import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import WelcomeScreen from '../WonderwiseApp/app/screens/auth/WelcomeScreen';
import LoginScreen from '../WonderwiseApp/app/screens/auth/LoginScreen';
import RegisterScreen from '../WonderwiseApp/app/screens/auth/RegisterScreen';
import DetailsScreen from '../WonderwiseApp/app/screens/main/DetailsScreen';
import InformationScreen from '../WonderwiseApp/app/screens/main/InformationScreen';
import WhatToKnowScreen from '../WonderwiseApp/app/screens/main/WhatToKnowScreen';
import InteractiveMapScreen from '../WonderwiseApp/app/screens/main/DetailsScreen';
import MyItineraryScreen from '../WonderwiseApp/app/screens/main/MapScreen';
import AddToItineraryScreen from '../WonderwiseApp/app/screens/main/AddToItineraryScreen';
import ProfileScreen from '../WonderwiseApp/app/screens/main/ProfileScreen';
import InformationCategoriesScreen from '../WonderwiseApp/app/screens/main/InfoCategoriesScreen';
import InformationOpinionsScreen from '../WonderwiseApp/app/screens/main/InfoOpinionScreen';
import ItineraryFormScreen from '../WonderwiseApp/app/screens/main/ItineraryScreen';
import IndexScreen from '../WonderwiseApp/app/screens/main/index';

// Define the navigation stack parameter list
export type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  IndexScreen: undefined; // Pantalla principal
  DetailsScreen: { place?: any };
  InformationScreen: undefined;
  WhatToKnowScreen: undefined;
  InteractiveMapScreen: undefined;
  MyItineraryScreen: undefined;
  AddToItineraryScreen: undefined;
  ProfileScreen: undefined;
  InformationCategoriesScreen: undefined;
  InformationOpinionsScreen: undefined;
  ItineraryFormScreen: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Authentication Flow */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        
        {/* Main App Flow */}
        <Stack.Screen name="IndexScreen" component={IndexScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        
        {/* Secondary Screens */}
        <Stack.Screen name="InformationScreen" component={InformationScreen} />
        <Stack.Screen name="WhatToKnowScreen" component={WhatToKnowScreen} />
        <Stack.Screen name="InteractiveMapScreen" component={InteractiveMapScreen} />
        <Stack.Screen name="MyItineraryScreen" component={MyItineraryScreen} />
        <Stack.Screen name="AddToItineraryScreen" component={AddToItineraryScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="InformationCategoriesScreen" component={InformationCategoriesScreen} />
        <Stack.Screen name="InformationOpinionsScreen" component={InformationOpinionsScreen} />
        <Stack.Screen name="ItineraryFormScreen" component={ItineraryFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;