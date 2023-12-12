

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handlePlaceOrder = () => {
    if (!name || !phoneNumber || !email || !address) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    // You can add more specific validations for phone number, email, etc.

    // Implement your order placement logic here
    // You can send the user details to your server or perform any other necessary actions
    console.log('Order placed:', { name, phoneNumber, email, address });
    navigation.navigate('OrderSuccess');
  };

  return (
    <ImageBackground
      source={require("../assets/hero1.jpg")} // Replace with the actual path to your image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Button title="Place Order" onPress={handlePlaceOrder} style={styles.button} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  container: {
    padding: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white', // Set label text color
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    backgroundColor: 'white', // Set input background color
    opacity: 1.0, // Set input opacity
  },
  button: {
    marginTop: 50,
  },
});

export default CheckoutScreen;

