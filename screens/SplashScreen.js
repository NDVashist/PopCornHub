import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home'); // Navigate to Home screen
    }, 3000); // Display splash screen for 3 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '80%',
    height: '25%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
