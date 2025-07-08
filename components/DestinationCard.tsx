import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Destination } from '../app/types';

interface DestinationCardProps {
  destination: Destination;
  onPress: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onPress }) => {
  const handlePress = () => {
    onPress(destination);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: destination.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{destination.name}</Text>
        <View style={styles.location}>
          <Icon name="map-pin" size={14} color="#6B7280" />
          <Text style={styles.locationText}>{destination.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 192,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
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
    fontWeight: '500',
    color: '#111827',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
});

export default DestinationCard;