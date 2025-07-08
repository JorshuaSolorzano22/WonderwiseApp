import React from 'react';
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

interface MyItineraryScreenProps {
  navigation: any;
}

interface Activity {
  id: number;
  name: string;
  location: string;
  time: string;
  category: string;
  image?: string;
  note?: string;
}

interface ItineraryDay {
  date: string;
  activitiesCount: number;
  activities: Activity[];
}

const MyItineraryScreen: React.FC<MyItineraryScreenProps> = ({ navigation }) => {
  const itineraryData: ItineraryDay[] = [
    {
      date: 'Lunes, 15 de mayo 2025',
      activitiesCount: 3,
      activities: [
        {
          id: 1,
          name: 'Machu Picchu',
          location: 'Cusco, Perú',
          time: '09:00 - 13:00',
          category: 'Cultura',
          image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ierr1PaVWvU84b0iDH5GtQKnj7RJEU.png',
          note: 'Llevar protector solar y agua'
        },
        {
          id: 2,
          name: 'Almuerzo',
          location: 'Aguas Calientes, Perú',
          time: '13:30 - 15:00',
          category: 'Gastronomía',
          image: 'https://via.placeholder.com/80x60/FF6B6B/FFFFFF?text=Food',
        },
        {
          id: 3,
          name: 'Tren de regreso',
          location: 'Cusco, Perú',
          time: '16:00 - 18:00',
          category: 'Transporte',
          note: 'Confirmar 2 horas antes'
        }
      ]
    },
    {
      date: 'Martes, 16 de mayo 2025',
      activitiesCount: 2,
      activities: []
    }
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Cultura': return '#9C27B0';
      case 'Gastronomía': return '#FF9800';
      case 'Transporte': return '#2196F3';
      default: return '#666';
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
        <Text style={styles.headerTitle}>Mi itinerario</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Lista de actividades</Text>

        {itineraryData.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.dayContainer}>
            {/* Date Header */}
            <View style={styles.dateHeader}>
              <View style={styles.dateInfo}>
                <Icon name="event" size={20} color="#007AFF" />
                <View style={styles.dateText}>
                  <Text style={styles.dateTitle}>{day.date}</Text>
                  <Text style={styles.activitiesCount}>{day.activitiesCount} actividades</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={16} color="#007AFF" />
                <Text style={styles.addButtonText}>Añadir</Text>
              </TouchableOpacity>
            </View>

            {/* Activities */}
            {day.activities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityContent}>
                  {activity.image && (
                    <Image source={{ uri: activity.image }} style={styles.activityImage} />
                  )}
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <View style={styles.locationRow}>
                      <Icon name="location-on" size={14} color="#666" />
                      <Text style={styles.activityLocation}>{activity.location}</Text>
                    </View>
                    <View style={styles.timeRow}>
                      <Icon name="access-time" size={14} color="#666" />
                      <Text style={styles.activityTime}>{activity.time}</Text>
                    </View>
                    {activity.note && (
                      <Text style={styles.activityNote}>"{activity.note}"</Text>
                    )}
                  </View>
                </View>
                <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(activity.category) }]}>
                  <Text style={styles.categoryText}>{activity.category}</Text>
                </View>
              </View>
            ))}

            {day.activities.length === 0 && (
              <View style={styles.emptyDay}>
                <Text style={styles.emptyDayText}>No hay actividades programadas</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="explore" size={24} color="#666" />
          <Text style={styles.navText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="map" size={24} color="#666" />
          <Text style={styles.navText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="list" size={24} color="#007AFF" />
          <Text style={[styles.navText, { color: '#007AFF' }]}>Mi plan</Text>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  dayContainer: {
    marginBottom: 24,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: 12,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  activitiesCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addButtonText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 4,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  activityContent: {
    flexDirection: 'row',
    padding: 16,
  },
  activityImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  activityNote: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  emptyDay: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyDayText: {
    fontSize: 14,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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

export default MyItineraryScreen;