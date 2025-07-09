"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../../AccesoFireBase"

interface User {
  id: string
  nombre: string
  correo: string
  contrasena: string
}

interface UserControlScreenProps {
  navigation: any
}

const UserControlScreen: React.FC<UserControlScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editedName, setEditedName] = useState("")
  const [editedEmail, setEditedEmail] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const unsubscribe = onSnapshot(collection(db, "Usuarios"), (snapshot) => {
          const usersData: User[] = []
          snapshot.forEach((doc) => {
            usersData.push({
              id: doc.id,
              nombre: doc.data().nombre || "",
              correo: doc.data().correo || "",
              contrasena: doc.data().contrasena || "",
            })
          })
          setUsers(usersData)
          setLoading(false)
        })
        return () => unsubscribe()
      } catch (error) {
        console.error("Error fetching users:", error)
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleDeleteUser = (userId: string) => {
    Alert.alert("Confirmar eliminación", "¿Estás seguro de que deseas eliminar este usuario?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "Usuarios", userId))
            Alert.alert("Éxito", "Usuario eliminado correctamente")
          } catch (error) {
            console.error("Error deleting user:", error)
            Alert.alert("Error", "No se pudo eliminar el usuario")
          }
        },
        style: "destructive",
      },
    ])
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setEditedName(user.nombre)
    setEditedEmail(user.correo)
  }

  const handleSaveEdit = async () => {
    if (!editingUser) return
    try {
      await updateDoc(doc(db, "Usuarios", editingUser.id), {
        nombre: editedName,
        correo: editedEmail,
      })
      setEditingUser(null)
      Alert.alert("Éxito", "Usuario actualizado correctamente")
    } catch (error) {
      console.error("Error updating user:", error)
      Alert.alert("Error", "No se pudo actualizar el usuario")
    }
  }

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nombre}</Text>
        <Text style={styles.userEmail}>{item.correo}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEditUser(item)} style={styles.actionButton}>
          <Icon name="edit" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.actionButton}>
          <Icon name="delete" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderEditModal = () => (
    <Modal visible={!!editingUser} animationType="slide" transparent={true} onRequestClose={() => setEditingUser(null)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Usuario</Text>
          <TextInput style={styles.input} value={editedName} onChangeText={setEditedName} placeholder="Nombre" />
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setEditingUser(null)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSaveEdit}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={20} color="#007AFF" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestión de Usuarios</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay usuarios registrados</Text>
          </View>
        }
      />

      {renderEditModal()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("IndexScreen")}>
          <Icon name="explore" size={24} color="#666" />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("MapScreen")}>
          <Icon name="map" size={24} color="#666" />
          <Text style={styles.navText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ItineraryScreen")}>
          <Icon name="list" size={24} color="#666" />
          <Text style={styles.navText}>Mi plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ProfileScreen")}>
          <Icon name="person" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: "#007AFF" }]}>Perfil</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
})

export default UserControlScreen
