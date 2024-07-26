import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const SplashScreen = ({ navigation }) => {
  const bounceValue = useRef(new Animated.Value(1)).current;
  const blurValue = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(blurValue, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('Home');
    }, 3000); // Display splash screen for 3 seconds
  }, [navigation, bounceValue, blurValue]);

  return (
    <View style={styles.container}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={blurValue}
      />
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: bounceValue }] }]}>
        <Image source={require('../assets/splash.png')} style={styles.image} />
      </Animated.View>
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
  imageContainer: {
    width: '80%',
    height: '25%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default SplashScreen;
