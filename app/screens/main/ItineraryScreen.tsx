"use client"

import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { ScreenProps } from "@/types/navigations"
import BottomNavigation from "@/components/BottonNavigation"

const MyItineraryScreen: React.FC<ScreenProps<"ItineraryScreen">> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Plan</Text>
        <TouchableOpacity>
          <Icon name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Icon name="event-note" size={64} color="#ccc" />
          <Text style={styles.title}>Mi Plan de Viaje</Text>
          <Text style={styles.subtitle}>Aquí aparecerán todos tus itinerarios guardados y planificados.</Text>
          <Text style={styles.emptyText}>No tienes itinerarios guardados aún</Text>

          <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("ItineraryScreen")}>
            <Icon name="add" size={20} color="#fff" />
            <Text style={styles.createButtonText}>Crear nuevo itinerario</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavigation navigation={navigation} activeTab="Mi plan" />
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyState: {
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
  emptyText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 24,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})

export default MyItineraryScreen
