import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { useState, useEffect } from 'react';
import ROUTE from '../globals/nico';
const windowWidth = Dimensions.get('window').width;


export default function HomeScreen({ navigation }) {
  const [filter, setFilter] = useState("A la une")
  const [recipes, setRecipes] = useState([])

  const tagsList = ["A la une", "Pas cher", "Peu de vaisselle", "Pour les fetes", "A cuisiner en famille", "Pour les enfant", "Express"]
  const filters = tagsList.map((e, i) => {
    return (
      <TouchableOpacity key={i} onPress={() => setFilter(e)}>
        <Text style={filter === e ? styles.filterSelected : styles.filter}>{e}</Text>
      </TouchableOpacity>
    )
  })

  useEffect(() => {
    (async () => {
      const response = await fetch(`${ROUTE}/recipes`)
      const data = await response.json();
      setRecipes(data.res)
    })()
  }, [filter])

  const recipesList = recipes.map((e, i) => {
    return (
      <View key={i} style={styles.recipesContainer}>
        <Image
          source={{ uri: e.imageURL}}
          style={{flex: 1}}
        />
        <View style={{ flexDirection: "row", backgroundColor: "white", height: "40%", alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
          <Text style={{ fontSize: 16, fontWeight: "800", width: "72%" }}>{e.name}</Text>
          <TouchableOpacity>
            <FontAwesome name={'heart'} size={22} color='red' />
          </TouchableOpacity>
        </View>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>Les recettes</Text>
        <FontAwesome name={"search"} size={25} color='gray' />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerFilters}>
        {filters}
      </ScrollView>
      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerResults}>
        {recipesList}
      </ScrollView>
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
    alignItems: 'flex-end',
    paddingBottom: 32,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: 80,
  },
  filter: {
    fontSize: 16,
    fontWeight: "800",
    color: "gray",
    paddingHorizontal: 10,
  },
  filterSelected: {
    fontSize: 22,
    fontWeight: "800",
    color: "black",
    paddingHorizontal: 8,
  },
  containerResults: {
    height: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
  recipesContainer: {
    height: windowWidth * 58 / 100,
    width: windowWidth * 48 / 100,
    backgroundColor: 'red',
    margin: "1%",
    flexDirection: 'column',
  }
})