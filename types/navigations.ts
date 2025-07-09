import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RouteProp } from "@react-navigation/native"

export type RootStackParamList = {
  WelcomeScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  IndexScreen: undefined
  DetailsScreen: { place?: any }
  InformationScreen: undefined
  WhatToKnowScreen: undefined
  MapScreen: undefined
  ItineraryScreen: undefined
  AddToItineraryScreen: undefined
  ProfileScreen: undefined
  InfoCategoriesScreen: undefined
  InfoOpinionsScreen: undefined
  UserControlScreen: undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>
export type RoutePropType<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>


export interface ScreenProps<T extends keyof RootStackParamList> {
  navigation: NavigationProp
  route: RoutePropType<T>
}
