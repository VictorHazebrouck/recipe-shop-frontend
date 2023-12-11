import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function HomeScreen({ navigation }) {
  const [filter, setFilter] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>Les recettes</Text>
        <FontAwesome name={"search"} size={25} color='gray' />
      </View>
      <View style={styles.containerFilters}>
        <Text style={styles.filter}>A la une</Text>
        <Text style={styles.filter}>Express</Text>
        <Text style={styles.filter}>Pour noël</Text>
        <Text style={styles.filter}>Pas cher</Text>
        <Text style={styles.filter}>A la une</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#F9F8F8',
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  containerFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: 60
  },
  filter: {
    fontSize: 18,
    fontWeight: "800",
    color: "gray",
    paddingHorizontal: 20,
  }
})