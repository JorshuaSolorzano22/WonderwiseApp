import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface InteractiveMapScreenProps {
  navigation: any;
}

interface NearbyPlace {
  name: string;
  distance: string;
  rating: number;
}

type FilterType = 'Cultura' | 'Naturaleza' | 'Gastronomía';

const InteractiveMapScreen: React.FC<InteractiveMapScreenProps> = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('Cultura');
  const [searchText, setSearchText] = useState<string>('');

  const filters: FilterType[] = ['Cultura', 'Naturaleza', 'Gastronomía'];
  
  const nearbyPlaces: NearbyPlace[] = [
    { name: 'Parque del retiro', distance: '1.2 km', rating: 4.1 },
    { name: 'Museo del prado', distance: '1.8 km', rating: 4.8 },
    { name: 'Plaza mayor', distance: '2.3 km', rating: 4.6 },
  ];

  const getFilterIcon = (filter: FilterType): string => {
    switch (filter) {
      case 'Cultura': return 'museum';
      case 'Naturaleza': return 'park';
      case 'Gastronomía': return 'restaurant';
      default: return 'place';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa-interactivo</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar lugares cercanos..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Icon 
                name={getFilterIcon(filter)} 
                size={16} 
                color={selectedFilter === filter ? '#fff' : '#666'} 
              />
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Icon name="location-on" size={40} color="#007AFF" />
          <Text style={styles.mapText}>Mapa interactivo</Text>
        </View>
        
        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapControl}>
            <Icon name="my-location" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControl}>
            <Icon name="navigation" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControl}>
            <Icon name="filter-list" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nearby Places */}
      <View style={styles.nearbyContainer}>
        <Text style={styles.nearbyTitle}>Lugares cercanos</Text>
        {nearbyPlaces.map((place, index) => (
          <TouchableOpacity key={index} style={styles.placeItem}>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeDistance}>{place.distance}</Text>
            </View>
            <View style={styles.placeRating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{place.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="explore" size={24} color="#666" />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="map" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Mapa</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  activeFilterText: {
    color: '#fff',
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  mapControl: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  placeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  placeDistance: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  placeRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
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

export default InteractiveMapScreen;