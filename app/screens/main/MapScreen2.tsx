"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, TextInput } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface MapScreenProps {
  navigation: any
}

interface Place {
  id: number
  name: string
  location: string
  category: string
  rating: number
  distance: string
  coordinates: { lat: number; lng: number }
}

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  const places: Place[] = [
    {
      id: 1,
      name: "Machu Picchu",
      location: "Cusco, Perú",
      category: "Cultura",
      rating: 4.9,
      distance: "2.5 km",
      coordinates: { lat: -13.1631, lng: -72.545 },
    },
    {
      id: 2,
      name: "Lago Titicaca",
      location: "Puno, Perú",
      category: "Naturaleza",
      rating: 4.2,
      distance: "5.8 km",
      coordinates: { lat: -15.8422, lng: -69.6954 },
    },
    {
      id: 3,
      name: "Plaza de Armas",
      location: "Lima, Perú",
      category: "Cultura",
      rating: 4.5,
      distance: "1.2 km",
      coordinates: { lat: -12.0464, lng: -77.0428 },
    },
    {
      id: 4,
      name: "Mercado San Pedro",
      location: "Cusco, Perú",
      category: "Gastronomía",
      rating: 4.3,
      distance: "3.1 km",
      coordinates: { lat: -13.517, lng: -71.9785 },
    },
  ]

  const categories = ["Todos", "Cultura", "Naturaleza", "Gastronomía", "Aventura"]

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || place.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    console.log("🗺️ MapScreen montada correctamente")
  }, [])

  const handlePlacePress = (place: Place) => {
    setSelectedPlace(place)
  }

  const handleNavigateToDetails = (place: Place) => {
    navigation.navigate("DetailsScreen", { place })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            console.log("🔙 Volviendo desde MapScreen")
            navigation.goBack()
          }}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mapa Interactivo</Text>
        <TouchableOpacity>
          <Icon name="my-location" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar lugares en el mapa..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Icon name="clear" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.activeCategoryButton]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.activeCategoryText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map Area */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={80} color="#4CAF50" />
          <Text style={styles.mapTitle}>🗺️ Mapa Interactivo</Text>
          <Text style={styles.mapSubtitle}>Aquí se mostraría un mapa interactivo con todos los lugares turísticos</Text>

          {/* Simulated Map Pins */}
          <View style={styles.mapPinsContainer}>
            {filteredPlaces.slice(0, 4).map((place, index) => (
              <TouchableOpacity
                key={place.id}
                style={[
                  styles.mapPin,
                  {
                    top: 50 + index * 30,
                    left: 50 + index * 40,
                    backgroundColor: selectedPlace?.id === place.id ? "#FF5722" : "#4CAF50",
                  },
                ]}
                onPress={() => handlePlacePress(place)}
              >
                <Icon name="place" size={24} color="#fff" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Map Controls */}
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="add" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="my-location" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Selected Place Info */}
      {selectedPlace && (
        <View style={styles.placeInfoContainer}>
          <View style={styles.placeInfo}>
            <View style={styles.placeDetails}>
              <Text style={styles.placeName}>{selectedPlace.name}</Text>
              <Text style={styles.placeLocation}>{selectedPlace.location}</Text>
              <View style={styles.placeStats}>
                <View style={styles.statItem}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.statText}>{selectedPlace.rating}</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="near-me" size={16} color="#666" />
                  <Text style={styles.statText}>{selectedPlace.distance}</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{selectedPlace.category}</Text>
                </View>
              </View>
            </View>
            <View style={styles.placeActions}>
              <TouchableOpacity style={styles.detailsButton} onPress={() => handleNavigateToDetails(selectedPlace)}>
                <Text style={styles.detailsButtonText}>Ver detalles</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.directionsButton}>
                <Icon name="directions" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Places List */}
      <View style={styles.placesListContainer}>
        <View style={styles.placesListHeader}>
          <Text style={styles.placesListTitle}>Lugares cercanos ({filteredPlaces.length})</Text>
          <TouchableOpacity>
            <Icon name="list" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.placesList}>
          {filteredPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={[styles.placeCard, selectedPlace?.id === place.id && styles.selectedPlaceCard]}
              onPress={() => handlePlacePress(place)}
            >
              <Text style={styles.placeCardName}>{place.name}</Text>
              <Text style={styles.placeCardLocation}>{place.location}</Text>
              <View style={styles.placeCardStats}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.placeCardRating}>{place.rating}</Text>
                <Text style={styles.placeCardDistance}>• {place.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("IndexScreen")}>
          <Icon name="explore" size={24} color="#666" />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("MapScreen2")}>
          <Icon name="map" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: "#007AFF" }]}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("ItineraryScreen")}>
          <Icon name="list" size={24} color="#666" />
          <Text style={styles.navText}>Mi plan</Text>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: "row",
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f8f9fa",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#e8f5e8",
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 16,
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  mapPinsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapPin: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapControls: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  controlButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  placeInfoContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  placeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  placeLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  placeStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  categoryBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
  },
  placeActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  directionsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placesListContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  placesListHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  placesListTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  placesList: {
    paddingHorizontal: 16,
  },
  placeCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    width: 160,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedPlaceCard: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E8",
  },
  placeCardName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  placeCardLocation: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  placeCardStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeCardRating: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  placeCardDistance: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
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

export default MapScreen
