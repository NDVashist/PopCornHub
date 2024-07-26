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
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.show.name}</Text>
          <Text style={styles.summary}>{item.show.summary}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        onFocus={() => navigation.navigate('Search')}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.show.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 5,
  },
  movieContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thumbnail: {
    width: 100,
    height: 150,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
