import React from 'react';
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
} from 'react-native';
import Swiper from 'react-native-swiper';
import Geolocation from 'react-native-geolocation-service';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
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
          <Text style={styles.locationText}>📍 Kurchi Binodbati, WB</Text>
          <TextInput
            placeholder="Search for fresh produce..."
            style={styles.searchInput}
          />
        </View>

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
  locationText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
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
  categoryList: {
    paddingHorizontal: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 8,
  },
  categoryItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
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
  },
});
