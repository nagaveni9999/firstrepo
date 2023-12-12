import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Cart() {
    const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
        setQuantities(Array(JSON.parse(cartData).length).fill(1));
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const updateQuantity = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
  };

  const removeItem = async (index) => {
    try {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const getTotalAmount = (item) => {
    const index = cart.indexOf(item);
    const quantity = quantities[index];
    return item.unitPrice * quantity;
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.unitPrice * quantities[index];
    });
    return total;
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://outofthesandbox.com/cdn/shop/articles/blog-checkout_600x.jpg?v=1592935831' }}
        style={styles.headerImage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueShoppingButton}
        onPress={() => navigation.navigate('DataFromAPI')}>
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        {cart.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>Rs.{item.unitPrice}</Text>
            <TextInput
              style={styles.quantityInput}
              value={quantities[index].toString()}
              keyboardType="numeric"
              onChangeText={(text) => updateQuantity(index, text)}
            />
            <Text style={styles.cell}>Rs.{getTotalAmount(item)}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(index)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.totalPriceContainer}>
        <Text>Total Price: Rs.{getTotalPrice()}</Text>
        <TouchableOpacity style={styles.checkoutButton} 
        onPress={() => navigation.navigate('CheckoutScreen')}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerImage: {
    height: 250,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  continueShoppingButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  cell: {
    flex: 1,
  },
  quantityInput: {
    flex: 1,
    textAlign: 'center',
  },
  removeButton: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  totalPriceContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default Cart;
