"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import type { ScreenProps } from "@/types/navigations"
import BottomNavigation from "@/components/BottonNavigation"

interface Review {
  id: number
  name: string
  avatar: string
  avatarColor: string
  rating: number
  comment: string
  date: string
}

type TabType = "Información" | "Multimedia" | "Mapa"
type SubTabType = "Descripción" | "Lo que debes saber" | "Categorías" | "Opiniones"

const DetailsScreen: React.FC<ScreenProps<"DetailsScreen">> = ({ navigation, route }) => {
  const { place } = route.params || {}
  const [activeTab, setActiveTab] = useState<TabType>("Información")
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("Descripción")

  const reviews: Review[] = [
    {
      id: 1,
      name: "Laura M.",
      avatar: "L",
      avatarColor: "#007AFF",
      rating: 5,
      comment:
        "Una experiencia increíble. La vista es impresionante y la energía del lugar es única. Recomiendo ir temprano para evitar multitudes.",
      date: "2 días atrás",
    },
    {
      id: 2,
      name: "Carlos R.",
      avatar: "C",
      avatarColor: "#4CAF50",
      rating: 4,
      comment:
        "Vale cada centavo. Lleven suficiente agua y protector solar. El recorrido puede ser agotador pero la vista compensa todo el esfuerzo.",
      date: "1 semana atrás",
    },
  ]

  const categories = ["Patrimonio UNESCO", "Cultura", "Historia", "Naturaleza", "Aventura"]

  const whatToKnowItems = [
    "Se recomienda comprar boletos con anticipación, especialmente en temporada alta.",
    "Lleva protector solar, agua y ropa cómoda para caminar.",
    "La altitud puede afectar a algunos visitantes, toma precauciones.",
    "No se permite el ingreso con alimentos ni bastones sin punta de goma.",
  ]

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon key={index} name={index < rating ? "star" : "star-border"} size={16} color="#FFD700" />
    ))
  }

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "Descripción":
        return (
          <View style={styles.subTabContent}>
            <Text style={styles.description}>
              {place?.description ||
                "Descubre la ciudadela inca más famosa del mundo, ubicada en lo alto de los Andes peruanos. Una experiencia única que combina historia, cultura y paisajes impresionantes."}
            </Text>
          </View>
        )

      case "Lo que debes saber":
        return (
          <View style={styles.subTabContent}>
            {whatToKnowItems.map((item, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>{item}</Text>
              </View>
            ))}
          </View>
        )

      case "Categorías":
        return (
          <View style={styles.subTabContent}>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <View key={index} style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{category}</Text>
                </View>
              ))}
            </View>
          </View>
        )

      case "Opiniones":
        return (
          <View style={styles.subTabContent}>
            <View style={styles.reviewsContainer}>
              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerInfo}>
                      <View style={[styles.avatar, { backgroundColor: review.avatarColor }]}>
                        <Text style={styles.avatarText}>{review.avatar}</Text>
                      </View>
                      <View style={styles.reviewerDetails}>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <View style={styles.starsContainer}>{renderStars(review.rating)}</View>
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <Text style={styles.reviewComment}>"{review.comment}"</Text>
                </View>
              ))}
            </View>
          </View>
        )

      default:
        return null
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Información":
        return (
          <View style={styles.tabContent}>
            {/* Sub Tabs */}
            <View style={styles.subTabContainer}>
              {(["Descripción", "Lo que debes saber", "Categorías", "Opiniones"] as SubTabType[]).map((subTab) => (
                <TouchableOpacity
                  key={subTab}
                  style={[styles.subTab, activeSubTab === subTab && styles.activeSubTab]}
                  onPress={() => setActiveSubTab(subTab)}
                >
                  <Text style={[styles.subTabText, activeSubTab === subTab && styles.activeSubTabText]}>{subTab}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {renderSubTabContent()}

            <TouchableOpacity style={styles.reviewsLink}>
              <Text style={styles.reviewsLinkText}>Ver todas las reseñas</Text>
              <Icon name="chat-bubble-outline" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )

      case "Multimedia":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>Contenido multimedia próximamente...</Text>
          </View>
        )

      case "Mapa":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>Mapa interactivo próximamente...</Text>
          </View>
        )

      default:
        return null
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
        <Text style={styles.headerTitle}>Detalles</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                place?.image ||
                "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            }}
            style={styles.mainImage}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.overlayTitle}>{place?.name || "Machu Picchu"}</Text>
            <Text style={styles.overlayLocation}>{place?.location || "Cusco, Perú"}</Text>
            <View style={styles.overlayIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="favorite-border" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="share" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Rating and Info */}
        <View style={styles.infoSection}>
          <View style={styles.ratingRow}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{place?.rating || "4.9"}</Text>
            <Text style={styles.reviewCount}>(2,345 reseñas)</Text>
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>Ver reseñas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickInfo}>
            <View style={styles.quickInfoItem}>
              <Icon name="schedule" size={20} color="#666" />
              <Text style={styles.quickInfoLabel}>Horario</Text>
              <Text style={styles.quickInfoValue}>{place?.schedule || "6:00 - 17:00"}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Icon name="attach-money" size={20} color="#666" />
              <Text style={styles.quickInfoLabel}>Precio</Text>
              <Text style={styles.quickInfoValue}>{place?.price || "$45 USD"}</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Icon name="access-time" size={20} color="#666" />
              <Text style={styles.quickInfoLabel}>Duración</Text>
              <Text style={styles.quickInfoValue}>{place?.duration || "3-4 horas"}</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(["Información", "Multimedia", "Mapa"] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Add to Itinerary Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("ItineraryScreen")}>
          <Text style={styles.addButtonText}>Agregar a mi itinerario</Text>
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Explorar" />
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
  },
  imageContainer: {
    height: 200,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  overlayLocation: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  overlayIcons: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 12,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
    flex: 1,
  },
  reviewButton: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reviewButtonText: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  quickInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickInfoItem: {
    alignItems: "center",
    flex: 1,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  quickInfoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  tabContent: {
    padding: 16,
  },
  subTabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 16,
  },
  subTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
  },
  activeSubTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  subTabText: {
    fontSize: 14,
    color: "#666",
  },
  activeSubTabText: {
    color: "#000",
    fontWeight: "600",
  },
  subTabContent: {
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#666",
    marginTop: 6,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  reviewsContainer: {
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  reviewerDetails: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: "row",
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
    lineHeight: 18,
    fontStyle: "italic",
  },
  reviewsLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  reviewsLinkText: {
    fontSize: 14,
    color: "#007AFF",
    marginRight: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
})

export default DetailsScreen
