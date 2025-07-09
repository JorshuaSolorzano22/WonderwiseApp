"use client"

import type React from "react"
import { useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { ScreenProps } from "@/types/navigations"

const { width, height } = Dimensions.get("window")

const WelcomeScreen: React.FC<ScreenProps<"WelcomeScreen">> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("LoginScreen")
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <View style={styles.content}>
        <Text style={styles.headerText}>Bienvenida</Text>

        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <View style={styles.mountainsContainer}>
              <View style={[styles.mountain, styles.mountain1]} />
              <View style={[styles.mountain, styles.mountain2]} />
              <View style={[styles.mountain, styles.mountain3]} />
              <Icon name="flight" size={24} color="#fff" style={styles.plane1} />
              <Icon name="flight" size={20} color="#fff" style={styles.plane2} />
            </View>

            <Text style={styles.logoText}>Wanderwise</Text>
            <Text style={styles.taglineText}>Explora el mundo de forma segura y confiable</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBackground: {
    width: width * 0.8,
    height: height * 0.7,
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    position: "relative",
  },
  mountainsContainer: {
    position: "relative",
    width: 120,
    height: 80,
    marginBottom: 40,
  },
  mountain: {
    position: "absolute",
    backgroundColor: "#2E7D32",
  },
  mountain1: {
    width: 50,
    height: 60,
    left: 0,
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    transform: [{ skewX: "-10deg" }],
  },
  mountain2: {
    width: 45,
    height: 70,
    left: 35,
    bottom: 0,
    backgroundColor: "#1B5E20",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    transform: [{ skewX: "5deg" }],
  },
  mountain3: {
    width: 40,
    height: 50,
    right: 0,
    bottom: 0,
    backgroundColor: "#388E3C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [{ skewX: "15deg" }],
  },
  plane1: {
    position: "absolute",
    top: 10,
    right: 20,
    transform: [{ rotate: "15deg" }],
  },
  plane2: {
    position: "absolute",
    top: 30,
    left: 10,
    transform: [{ rotate: "-10deg" }],
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  taglineText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.9,
  },
})

export default WelcomeScreen
