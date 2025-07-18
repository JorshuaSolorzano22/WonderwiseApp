"use client"

import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { db } from "../../../AccesoFireBase"
import type { ScreenProps } from "@/types/navigations"

const RegisterScreen: React.FC<ScreenProps<"RegisterScreen">> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (): Promise<void> => {
  if (!fullName || !email || !password) {
    Alert.alert("Campos incompletos", "Por favor completa todos los campos.")
    return
  }

  try {
    const usersRef = collection(db, "Usuarios")
    const q = query(usersRef, where("correo", "==", email))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      Alert.alert("Correo ya registrado", "Ya existe una cuenta con este correo.")
      return
    }

    await addDoc(usersRef, {
      nombre: fullName,
      correo: email,
      contrasena: password,
    })

    // Limpiar campos
    setFullName("")
    setEmail("")
    setPassword("")

    Alert.alert("Cuenta creada", "Tu cuenta ha sido creada correctamente.", [
      { text: "OK", onPress: () => navigation.replace("LoginScreen") },
    ])
  } catch (error) {
    console.error("Error al registrar:", error)
    Alert.alert("Error", "No se pudo crear la cuenta. Intenta de nuevo.")
  }
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.content}>
        <Text style={styles.headerText}>Bienvenida a Wanderwise</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "login" && styles.activeTab]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={[styles.tabText, activeTab === "login" && styles.activeTabText]}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "register" && styles.activeTab]}
            onPress={() => setActiveTab("register")}
          >
            <Text style={[styles.tabText, activeTab === "register" && styles.activeTabText]}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? "visibility" : "visibility-off"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Crear cuenta</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Al registrarte, aceptas nuestros <Text style={styles.linkText}>términos de servicio</Text> y{" "}
              <Text style={styles.linkText}>políticas de privacidad</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#f0f0f0",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  eyeIcon: {
    padding: 4,
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  termsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: "#4A90E2",
    textDecorationLine: "underline",
  },
})

export default RegisterScreen
