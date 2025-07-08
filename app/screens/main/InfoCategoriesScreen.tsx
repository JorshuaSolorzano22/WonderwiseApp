import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InformationCategoriesScreenProps {
  navigation: any;
}

interface Category {
  name: string;
  color: string;
}

type TabType = 'Información' | 'Multimedia' | 'Mapa';

const InformationCategoriesScreen: React.FC<InformationCategoriesScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Información');

  const categories: Category[] = [
    { name: 'Patrimonio UNESCO', color: '#8B5CF6' },
    { name: 'Cultura', color: '#EC4899' },
    { name: 'Historia', color: '#F59E0B' },
    { name: 'Naturaleza', color: '#10B981' },
    { name: 'Aventura', color: '#EF4444' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Información':
        return (
          <View style={styles.tabContent}>
            <View style={styles.tabSection}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.sectionSubtitle}>Lo que debes saber</Text>
              <Text style={styles.sectionHighlight}>Categorías</Text>
              <Text style={styles.sectionSubtitle}>Opiniones</Text>
            </View>
            
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.categoryTag, { backgroundColor: category.color }]}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.reviewsLink}>
              <Text style={styles.reviewsLinkText}>Ver todas las reseñas</Text>
              <Icon name="chat-bubble-outline" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        );
      case 'Multimedia':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>Contenido multimedia próximamente...</Text>
          </View>
        );
      case 'Mapa':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>Mapa interactivo próximamente...</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Información-cat</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ierr1PaVWvU84b0iDH5GtQKnj7RJEU.png'
            }}
            style={styles.mainImage}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.overlayTitle}>Machu Picchu</Text>
            <Text style={styles.overlayLocation}>Cusco, Perú</Text>
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
            <Text style={styles.rating}>4.9</Text>
            <Text style={styles.reviewCount}>(2,345 reseñas)</Text>
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>Ver reseñas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickInfo}>
            <View style={styles.quickInfoItem}>
              <Icon name="schedule" size={20} color="#666" />
              <Text style={styles.quickInfoLabel}>Horario</Text>
              <Text style={styles.quickInfoValue}>6:00 - 17:00</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Icon name="attach-money" size={20} color="#666" />
              <Text style={styles.quickInfoLabel}>Precio</Text>
              <Text style={styles.quickInfoValue}>$45 USD</Text>
            </View>
            <View style={styles.quickInfoItem}>
              <Icon name="access-time" size={20} color="#666" />
              <Text style={styles.quickInfoLabel}>Duración</Text>
              <Text style={styles.quickInfoValue}>3-4 horas</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['Información', 'Multimedia', 'Mapa'] as TabType[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Add to Itinerary Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar a mi itinerario</Text>
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="explore" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="map" size={24} color="#666" />
          <Text style={styles.navText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="list" size={24} color="#666" />
          <Text style={styles.navText}>Mi plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={24} color="#666" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
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
    overflow: 'hidden',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  overlayLocation: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  overlayIcons: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
  },
  infoSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  reviewButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reviewButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickInfoItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quickInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
  },
  tabSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  sectionHighlight: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 16,
  },
  reviewsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  reviewsLinkText: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default InformationCategoriesScreen;