"use client"

import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { ScreenProps } from "@/types/navigations"
import BottomNavigation from "@/components/BottonNavigation"

const ProfileScreen: React.FC<ScreenProps<"ProfileScreen">> = ({ navigation }) => {
  const profileOptions = [
    { icon: "person", title: "Información personal", subtitle: "Edita tu perfil" },
    { icon: "favorite", title: "Lugares favoritos", subtitle: "Tus destinos guardados" },
    { icon: "history", title: "Historial de viajes", subtitle: "Lugares que has visitado" },
    { icon: "settings", title: "Configuración", subtitle: "Preferencias de la app" },
    { icon: "help", title: "Ayuda y soporte", subtitle: "¿Necesitas ayuda?" },
    { icon: "logout", title: "Cerrar sesión", subtitle: "Salir de tu cuenta" },
  ]

  const handleOptionPress = (option: string) => {
    if (option === "Cerrar sesión") {
      navigation.navigate("LoginScreen")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity>
          <Icon name="edit" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: "https://via.placeholder.com/80x80/007AFF/FFFFFF?text=U" }} style={styles.avatar} />
          </View>
          <Text style={styles.userName}>Usuario Wanderwise</Text>
          <Text style={styles.userEmail}>usuario@wanderwise.com</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionItem} onPress={() => handleOptionPress(option.title)}>
              <View style={styles.optionLeft}>
                <Icon name={option.icon} size={24} color="#666" />
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <BottomNavigation navigation={navigation} activeTab="Perfil" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  optionsContainer: {
    paddingTop: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionText: {
    marginLeft: 16,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
})

export default ProfileScreen
