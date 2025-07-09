"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface Activity {
  id: string
  name: string
  location: string
  time: string
  category: string
  categoryColor: string
  note?: string
  image: string
}

interface DayItinerary {
  date: string
  dayName: string
  activities: Activity[]
}

interface ItineraryScreenProps {
  navigation: any
}

const ItineraryScreen: React.FC<ItineraryScreenProps> = ({ navigation }) => {
  const [itinerary] = useState<DayItinerary[]>([
    {
      date: "15 de mayo 2025",
      dayName: "Lunes",
      activities: [
        {
          id: "1",
          name: "Machu Picchu",
          location: "Cusco, Perú",
          time: "09:00 - 13:00",
          category: "Cultura",
          categoryColor: "#E91E63",
          note: "Llevar protector solar y agua",
          image:
            "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
        {
          id: "2",
          name: "Almuerzo",
          location: "Aguas Calientes, Perú",
          time: "13:30 - 15:00",
          category: "Gastronomía",
          categoryColor: "#FF9800",
          image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
        {
          id: "3",
          name: "Tren de regreso",
          location: "Cusco, Perú",
          time: "16:00 - 18:00",
          category: "Transporte",
          categoryColor: "#4CAF50",
          note: "Confirmar 2 horas antes",
          image:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
      ],
    },
    {
      date: "16 de mayo 2025",
      dayName: "Martes",
      activities: [
        {
          id: "4",
          name: "Valle Sagrado",
          location: "Cusco, Perú",
          time: "08:00 - 12:00",
          category: "Cultura",
          categoryColor: "#E91E63",
          image:
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
        {
          id: "5",
          name: "Mercado San Pedro",
          location: "Cusco, Perú",
          time: "14:00 - 16:00",
          category: "Gastronomía",
          categoryColor: "#FF9800",
          image:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
      ],
    },
  ])

  useEffect(() => {
    console.log("📅 ItineraryScreen montada correctamente")
  }, [])

  const renderActivityCard = (activity: Activity) => (
    <View key={activity.id} style={styles.activityCard}>
      <Image source={{ uri: activity.image }} style={styles.activityImage} />
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityName}>{activity.name}</Text>
          <View style={[styles.categoryTag, { backgroundColor: activity.categoryColor }]}>
            <Text style={styles.categoryText}>{activity.category}</Text>
          </View>
        </View>

        <View style={styles.activityDetail}>
          <Icon name="place" size={16} color="#666" />
          <Text style={styles.activityLocation}>{activity.location}</Text>
        </View>

        <View style={styles.activityDetail}>
          <Icon name="access-time" size={16} color="#666" />
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>

        {activity.note && <Text style={styles.activityNote}>"{activity.note}"</Text>}
      </View>
    </View>
  )

  const renderDaySection = (day: DayItinerary) => (
    <View key={`${day.dayName}-${day.date}`} style={styles.daySection}>
      <View style={styles.dayHeader}>
        <View style={styles.dayInfo}>
          <Icon name="event" size={20} color="#2196F3" />
          <View style={styles.dayTextContainer}>
            <Text style={styles.dayTitle}>
              {day.dayName}, {day.date}
            </Text>
            <Text style={styles.activityCount}>{day.activities.length} actividades</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={16} color="#2196F3" />
          <Text style={styles.addButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activitiesContainer}>{day.activities.map(renderActivityCard)}</View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi itinerario</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Lista de actividades</Text>

        {itinerary.map(renderDaySection)}

        {/* Add some bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("IndexScreen")}>
          <Icon name="home" size={24} color="#666" />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("MapScreen")}>
          <Icon name="map" size={24} color="#666" />
          <Text style={styles.navText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ItineraryScreen")}>
          <Icon name="list" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: "#007AFF" }]}>Mi plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ProfileScreen")}>
          <Icon name="person" size={24} color="#666" />
          <Text style={styles.navText}>Perfil</Text>
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
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 16,
    marginBottom: 20,
  },
  daySection: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  dayInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dayTextContainer: {
    marginLeft: 12,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  activityCount: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonText: {
    fontSize: 14,
    color: "#2196F3",
    marginLeft: 4,
    fontWeight: "500",
  },
  activitiesContainer: {
    gap: 12,
  },
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  activityImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  activityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    marginRight: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  activityDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  activityLocation: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  activityTime: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  activityNote: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
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

export default ItineraryScreen
