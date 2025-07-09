import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from "@/types/navigations"

// Import all screens
import WelcomeScreen from '../WonderwiseApp/app/screens/auth/WelcomeScreen';
import LoginScreen from '../WonderwiseApp/app/screens/auth/LoginScreen';
import RegisterScreen from '../WonderwiseApp/app/screens/auth/RegisterScreen';
import DetailsScreen from '../WonderwiseApp/app/screens/main/DetailsScreen';
import InformationScreen from '../WonderwiseApp/app/screens/main/InformationScreen';
import WhatToKnowScreen from '../WonderwiseApp/app/screens/main/WhatToKnowScreen';
import MapScreen from '../WonderwiseApp/app/screens/main/DetailsScreen';
import ItineraryScreen from '../WonderwiseApp/app/screens/main/MapScreen';
import AddToItineraryScreen from '../WonderwiseApp/app/screens/main/AddToItineraryScreen';
import ProfileScreen from '../WonderwiseApp/app/screens/main/ProfileScreen';
import InfoCategoriesScreen from '../WonderwiseApp/app/screens/main/InfoCategoriesScreen';
import InfoOpinionsScreen from '../WonderwiseApp/app/screens/main/InfoOpinionScreen';
import IndexScreen from '../WonderwiseApp/app/screens/main/index';

const Stack = createNativeStackNavigator<RootStackParamList>()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
      >
        {/* Authentication Flow */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        {/* Main App Flow */}
        <Stack.Screen name="IndexScreen" component={IndexScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />

        {/* Secondary Screens */}
        <Stack.Screen name="InformationScreen" component={InformationScreen} />
        <Stack.Screen name="WhatToKnowScreen" component={WhatToKnowScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ItineraryScreen" component={ItineraryScreen} />
        <Stack.Screen name="AddToItineraryScreen" component={AddToItineraryScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="InfoCategoriesScreen" component={InfoCategoriesScreen} />
        <Stack.Screen name="InfoOpinionsScreen" component={InfoOpinionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;