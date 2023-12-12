import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function NoPlanningScreen({ navigation }) {
  // const dispatch = useDispatch();
  const [filter, setFilter] = useState()
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    ( async ()=>{
      const response = await fetch(`http://10.1.1.71:3000/recipes`)
      const data = await response.json();
      setRecipes(data.res) 
    })()
  }, [filter])

  const recipesList = recipes.map((e, i) => {
    return (
      <View key={i} style={styles.recipesContainer}>
        <View style={styles.recipesList }>
          <Text style={{ fontSize: 16, fontWeight: "600", width: "80%" }}>{e.name}</Text>
          <FontAwesome name='minus' onPress={() => dispatch(removeRecipe(data.name))} size={25} color='#CC3F0C' />
        </View>        
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>Mes envies</Text>
        <Text style={styles.text}>Historique</Text>
      </View>

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
  containerResults: {
    height: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
  recipesContainer: {
    margin: "1%",
    flexDirection: 'column-reverse',
  },
  recipesList: {
    flexDirection: "row",  
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1, 
    borderColor: '#937B8A',
    borderRadius:5,
    marginLeft: 30,
  },
})