import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from "@/types/navigations"

import WelcomeScreen from '../WonderwiseApp/app/screens/auth/WelcomeScreen';
import LoginScreen from '../WonderwiseApp/app/screens/auth/LoginScreen';
import RegisterScreen from '../WonderwiseApp/app/screens/auth/RegisterScreen';
import DetailsScreen from '../WonderwiseApp/app/screens/main/DetailsScreen';
import InformationScreen from '../WonderwiseApp/app/screens/main/InformationScreen';
import WhatToKnowScreen from '../WonderwiseApp/app/screens/main/WhatToKnowScreen';
import MapScreen from '../WonderwiseApp/app/screens/main/DetailsScreen';
import ItineraryScreen from '../WonderwiseApp/app/screens/main/MapScreen2';
import AddToItineraryScreen from '../WonderwiseApp/app/screens/main/AddToItineraryScreen';
import ProfileScreen from '../WonderwiseApp/app/screens/main/ProfileScreen';
import InfoCategoriesScreen from '../WonderwiseApp/app/screens/main/InfoCategoriesScreen';
import InfoOpinionsScreen from '../WonderwiseApp/app/screens/main/InfoOpinionScreen';
import IndexScreen from '../WonderwiseApp/app/screens/main/index';
import UserControlScreen from '../WonderwiseApp/app/screens/main/UserControlScreen';

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
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        <Stack.Screen name="IndexScreen" component={IndexScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />

        <Stack.Screen name="InformationScreen" component={InformationScreen} />
        <Stack.Screen name="WhatToKnowScreen" component={WhatToKnowScreen} />
        <Stack.Screen name="MapScreen2" component={MapScreen} />
        <Stack.Screen name="ItineraryScreen" component={ItineraryScreen} />
        <Stack.Screen name="AddToItineraryScreen" component={AddToItineraryScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="InfoCategoriesScreen" component={InfoCategoriesScreen} />
        <Stack.Screen name="InfoOpinionsScreen" component={InfoOpinionsScreen} />
        <Stack.Screen name="UserControlScreen" component={UserControlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;