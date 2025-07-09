import type React from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import type { ScreenProps } from "@/types/navigations"
import BottomNavigation from "@/components/BottonNavigation"

const { width } = Dimensions.get("window")

const IndexScreen: React.FC<ScreenProps<"IndexScreen">> = ({ navigation }) => {
  const handleCardPress = (place: any) => {
    navigation.navigate("DetailsScreen", { place })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explorar</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-pin" size={16} color="#6B7280" />
            <Text style={styles.locationText}>Perú</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar lugares, ciudades, actividades..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.navArrow}>
            <Icon name="chevron-left" size={16} color="#6B7280" />
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryScrollContent}
          >
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>🏛️ Cultura</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>🌿 Naturaleza</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>🍽️ Gastronomía</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.navArrow}>
            <Icon name="chevron-right" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>Destacados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Recomendados para ti</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Consejos locales</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destacados</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>Ver todos</Text>
            <Icon name="chevron-right" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handleCardPress({
                id: 1,
                name: "Machu Picchu",
                location: "Cusco, Perú",
                rating: 4.9,
                image:
                  "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                description:
                  "Descubre la ciudadela inca más famosa del mundo, ubicada en lo alto de los Andes peruanos.",
                price: "$45 USD",
                duration: "3-4 horas",
                schedule: "6:00 - 17:00",
              })
            }
            activeOpacity={0.8}
          >
            <View style={styles.cardImageContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Machu Picchu</Text>
              <View style={styles.cardLocation}>
                <Icon name="map-pin" size={14} color="#6B7280" />
                <Text style={styles.cardLocationText}>Cusco, Perú</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handleCardPress({
                id: 2,
                name: "Lago Titicaca",
                location: "Puno, Perú",
                rating: 4.2,
                image:
                  "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                description: "Explora el lago navegable más alto del mundo y conoce las islas flotantes de los Uros.",
                price: "$35 USD",
                duration: "2-3 horas",
                schedule: "8:00 - 18:00",
              })
            }
            activeOpacity={0.8}
          >
            <View style={styles.cardImageContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.2</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Lago Titicaca</Text>
              <View style={styles.cardLocation}>
                <Icon name="map-pin" size={14} color="#6B7280" />
                <Text style={styles.cardLocationText}>Puno, Perú</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Explorar" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  navArrow: {
    padding: 8,
  },
  categoryScroll: {
    flex: 1,
  },
  categoryScrollContent: {
    paddingHorizontal: 8,
  },
  categoryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  categoryText: {
    fontSize: 14,
    color: "#374151",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 16,
  },
  tab: {
    paddingBottom: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#111827",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#111827",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
    marginRight: 4,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 192,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLocationText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
})

export default IndexScreen
