import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import ROUTE from '../globals/nico';

export default function NoPlanningScreen({ navigation }) {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    ( async ()=>{
      const response = await fetch(`${ROUTE}/recipes`)
      const data = await response.json();
      setRecipes(data.res) 
    })()
  }, [])

  const handleAddRecipe = () => {
    navigation.navigate('Home');
  };

  const handleDeleteRecipe = (recipeName) => {
    // Filtrer les recettes pour supprimer celle avec le nom correspondant
    setRecipes((e) => e.filter((recipe) => recipe.name !== recipeName));
  };

  const recipesList = recipes.map((e, i) => { 
    return (
        <View key={i} style={styles.recipesContainer}>
          <View style={styles.recipesList}>
            <Text style={{ fontSize: 16, fontWeight: '600', width: '80%' }}>{e.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteRecipe(e.name)}>
              <FontAwesome style={{ marginLeft: 10 }} name='trash-o' size={25} color='#CC3F0C' />
            </TouchableOpacity>
          </View>
        </View>
    );
  });

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

          <TouchableOpacity style={styles.addRecipe } onPress={handleAddRecipe}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: '#ffffff', width: "80%" }}>Ajouter une recette</Text>
            
            <FontAwesome style={{ marginLeft: 10 }} name='plus' size={25} color='#ffffff' />
            </TouchableOpacity>

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
  addRecipe: {
    flexDirection: "row",  
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#CC3F0C',
    marginTop: 30,
    marginLeft: 40,
    width:'80%',
    borderRadius:5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})