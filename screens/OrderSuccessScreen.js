
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderSuccessScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Assuming you are using React Navigation, navigate to the WelcomePage
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.successText}>Order Placed Successfully</Text>

      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundImage: 'url("https://png.pngtree.com/png-clipart/20210917/ourmid/pngtree-3d-fiber-abstract-blue-curve-line-png-image_3936070.png")',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
});

export default OrderSuccessScreen;

