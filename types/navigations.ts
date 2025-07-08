import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  IndexScreen: undefined;
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

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
