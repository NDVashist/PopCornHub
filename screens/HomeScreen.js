/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieContainer} onPress={() => navigation.navigate('Details', { movie: item.show })}>
      <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} resizeMode='contain' />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.show.name}</Text>
        {/* <Text style={styles.summary}>{item.show.summary}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onFocus={() => navigation.navigate('Search')}
        placeholderTextColor={'white'}
      />
      <FlatList 
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.show.id.toString()}
        numColumns={2} // Set the number of columns to 2 for grid layout
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchBar: {
    padding: 10,
    backgroundColor: 'black',
    borderColor:'white',
    borderWidth:2,
    margin: 10,
    borderRadius:45,
    color:'white',
    paddingLeft:20,
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    // backgroundColor:'red',
    margin:6,
    borderWidth:0.2,
    borderRadius:1,
    alignItems:'center',
   
    shadowColor:'blue',

  },
  thumbnail: {
    width: '80%',
    height: 100,


  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
  },
  summary: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
