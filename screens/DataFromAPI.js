
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


function DataFromAPI() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:44340/api/Garments');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
    // Add your logic to add items to the cart
    const addToCart = async (item) => {
        try {
          let cartItems = [];
          const existingCartData = await AsyncStorage.getItem('cart');
          if (existingCartData) {
            cartItems = JSON.parse(existingCartData);
          }
          cartItems.push(item);
          await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      
          // Show an alert message
          global.alert('Product added to cart');
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>Name: {item.name}</Text>
              <Text style={styles.cardUnitPrice}>Price: Rs.{item.unitPrice}</Text>
              <Text style={styles.cardDiscount}>Discount: Rs.{item.discount}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={navigateToCart}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    marginBottom: 25,
  },
  cardImage: {
    height: 250,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardUnitPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  cardDiscount: {
    fontSize: 14,
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  cartButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  cartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DataFromAPI;
