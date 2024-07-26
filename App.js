/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';
import { Image } from 'react-native';

function Hearthead() {
  return(<Image
  style={{ width:100,height:40,justifyContent:'left'}}
  source={require('./assets/splash.png')} /> );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"
      screenOptions={{
        headerStyle : {
          backgroundColor: 'black',
          
        },
        headerTintColor:'#fff',
        headerTittleStyle:{
          fontWeight:'bold',
        },

       }}>
        <Stack.Screen name="Splash" component={SplashScreen}  options= {{
          headerTitle: (props) => < Hearthead{...props} /> }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options= {{
          headerTitle: (props) => < Hearthead{...props} /> }}
          />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
