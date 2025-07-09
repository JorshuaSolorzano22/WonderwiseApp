"use client"

import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { ScreenProps } from "@/types/navigations"
import BottomNavigation from "@/components/BottonNavigation"

const InteractiveMapScreen: React.FC<ScreenProps<"MapScreen">> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mapa Interactivo</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={64} color="#ccc" />
          <Text style={styles.title}>Mapa Interactivo</Text>
          <Text style={styles.subtitle}>Aquí podrás explorar lugares turísticos en un mapa interactivo.</Text>
          <Text style={styles.comingSoon}>Próximamente...</Text>
        </View>
      </View>

      <BottomNavigation navigation={navigation} activeTab="Mapa" />
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
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mapPlaceholder: {
    alignItems: "center",
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
  },
  comingSoon: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
})

export default InteractiveMapScreen
