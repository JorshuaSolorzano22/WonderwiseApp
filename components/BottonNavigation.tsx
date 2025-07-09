"use client"

import type React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import type { NavigationProp } from "@/types/navigations"

interface BottomNavigationProps {
  navigation: NavigationProp
  activeTab: "Explorar" | "Mapa" | "Mi plan" | "Perfil"
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ navigation, activeTab }) => {
  const handleNavigation = (tab: string) => {
    switch (tab) {
      case "Explorar":
        navigation.navigate("IndexScreen")
        break
      case "Mapa":
        navigation.navigate("MapScreen")
        break
      case "Mi plan":
        navigation.navigate("ItineraryScreen")
        break
      case "Perfil":
        navigation.navigate("ProfileScreen")
        break
      default:
        console.log("Navegación no encontrada para:", tab)
    }
  }

  const getIconName = (tab: string) => {
    switch (tab) {
      case "Explorar":
        return "home"
      case "Mapa":
        return "map"
      case "Mi plan":
        return "calendar"
      case "Perfil":
        return "user"
      default:
        return "home"
    }
  }

  const tabs = ["Explorar", "Mapa", "Mi plan", "Perfil"]

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab} style={styles.navItem} onPress={() => handleNavigation(tab)}>
          <Icon name={getIconName(tab)} size={20} color={activeTab === tab ? "#3B82F6" : "#9CA3AF"} />
          <Text style={[styles.navText, activeTab === tab && styles.activeNavText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  activeNavText: {
    color: "#3B82F6",
    fontWeight: "500",
  },
})

export default BottomNavigation
