/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = (term) => {
    axios.get(`https://api.tvmaze.com/search/shows?q=${term}`)
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  };

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
        placeholder="Search for movies..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => handleSearch(searchTerm)}
      />
      <FlatList style={styles.blocks}
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

export default SearchScreen;
