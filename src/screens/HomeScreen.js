import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Geolocation from 'react-native-geolocation-service';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Fetching location...');
  const [loadingLocation, setLoadingLocation] = useState(true);

  const categories = [
    { id: '1', name: 'Fruits', image: require('../assets/categories/fruit.png') },
    { id: '2', name: 'Vegetables', image: require('../assets/categories/vegetable.png') },
    { id: '3', name: 'Dairy', image: require('../assets/categories/dairy-products.png') },
    { id: '4', name: 'Spices', image: require('../assets/categories/spicy-food.png') },
  ];

  const freshItems = [
    { id: '1', name: 'Fresh Mangoes', image: require('../assets/logo.png') },
    { id: '2', name: 'Green Spinach', image: require('../assets/logo.png') },
    { id: '3', name: 'Organic Milk', image: require('../assets/logo.png') },
  ];

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // For iOS, permissions are handled through Info.plist
      return true;
    }
  }

  const getCurrentLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setAddress('Location permission denied');
        setLoadingLocation(false);
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.warn(error.code, error.message);
          setAddress('Unable to get location');
          setLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.warn('Location error:', error);
      setAddress('Location error occurred');
      setLoadingLocation(false);
    }
  };

  // Reverse geocoding to get readable address
  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      // Note: Replace 'YOUR_API_KEY' with your actual Google Maps API key
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Get a shorter, more readable address
        const addressComponents = data.results[0].address_components;
        let readableAddress = '';
        
        // Extract locality or neighborhood if available
        const locality = addressComponents.find(component => 
          component.types.includes('locality')
        );
        const neighborhood = addressComponents.find(component => 
          component.types.includes('neighborhood')
        );
        
        if (locality) {
          readableAddress = locality.long_name;
        } else if (neighborhood) {
          readableAddress = neighborhood.long_name;
        } else {
          // Fallback to the full formatted address
          readableAddress = data.results[0].formatted_address.split(',')[0];
        }
        
        setAddress(readableAddress);
      } else {
        setAddress('Location found (address unavailable)');
      }
    } catch (error) {
      console.warn('Geocoding error:', error);
      // Fallback to showing coordinates if address fetch fails
      setAddress(`Near ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFreshItem = ({ item }) => (
    <TouchableOpacity style={styles.freshItem}>
      <Image source={item.image} style={styles.freshImage} />
      <Text style={styles.freshText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF5E1" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            {loadingLocation ? (
              <ActivityIndicator size="small" color="#FF8C00" style={styles.loadingIndicator} />
            ) : null}
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {address}
            </Text>
          </View>
          <TextInput
            placeholder="Search for fresh produce..."
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>

        {/* Rest of your components remain the same */}
        {/* Banner Slider */}
        <View style={styles.bannerContainer}>
          <Swiper autoplay autoplayTimeout={3} showsPagination={true} dotColor="#ccc" activeDotColor="#FF8C00">
            <Image source={require('../assets/banners/banner.png')} style={styles.banner} />
            <Image source={require('../assets/banners/daniel-shapiro--QtglPvx3I0-unsplash.jpg')} style={styles.banner} />
            <Image source={require('../assets/banners/anita-jankovic-c7PT4PZMcNA-unsplash.jpg')} style={styles.banner} />
          </Swiper>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={4}
          scrollEnabled={false}
          contentContainerStyle={styles.categoriesContainer}
        />

        {/* Fresh Items */}
        <Text style={styles.sectionTitle}>Fresh Arrivals</Text>
        <FlatList
          data={freshItems}
          renderItem={renderFreshItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.freshList}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFF5E1',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationIcon: {
    marginRight: 5,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  loadingIndicator: {
    marginRight: 5,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  // ... rest of your styles remain the same
  bannerContainer: {
    height: 180,
    width: '100%',
    marginVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    elevation: 2,
    flex: 1,
  },
  categoryImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  freshList: {
    paddingHorizontal: 10,
  },
  freshItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    elevation: 2,
    width: 120,
  },
  freshImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  freshText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});