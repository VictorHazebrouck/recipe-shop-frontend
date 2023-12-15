import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import ROUTE from '../globals/nico';

export default function PlanningScreen({ navigation }) {

  const [recipes, setRecipes] = useState({});
  const [recipesToDelete, setRecipesToDelete] = useState([]);

  const handleAddRecipe = () => {
    navigation.navigate('Home');
  };

  const handleDeleteRecipe = (recipeName) => {
    // Ajout de la recette à la liste des recettes à supprimer
    setRecipesToDelete([...recipesToDelete, recipeName]);
  };

  // FORMATAGE DE LA DATE
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  // PARAMÉTRAGE DE L'AFFICHAGE DES DATES EN FRANÇAIS
  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = 'fr'; 

  const loadItems = (day) => {

    fetch(`${ROUTE}/users/recipes`)
      .then(response => response.json())
      .then(data => {

        const recettes = {} 
        const receiveRecipesList = data.response.currentRecipes

        // chargement des recettes 15 jours avant et 85 jours après la date du jour
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);

          // initialisation d'un tableau vide des recettes en fonction de la date formatée
          // pour gérer l'affichage de la date sur toute la largeur avec firstItemDay
          // ajout d'un bouton addButton pour afficher "ajouter une recette à chaque date même quand il n'y a pas de résultat"
          recettes[strTime] = [{},{addButton:true}];          
      }
      // on formate la date pour répondre à l'exigence d'Agenda.
      receiveRecipesList.forEach(e => {          
        const date = e.date.split('T')[0]

        // on remplit les données dans les dates concernées (dans les 100 jours)
        recettes[date].splice(1, 0, { 
          name: e.id.name,
        });
      });      
        setRecipes(recettes)
      })
  }

  // AFFICHAGE DES JOURS 
  const renderDay = (day) => {
    if (day) {
      const options = { weekday: 'long', day: 'numeric' };
      const formatter = new Intl.DateTimeFormat('fr-FR', options);
      const formattedDate = formatter.format(day);

      // Extraire la première lettre et la mettre en majuscule
      const firstLetterUpperCase = formattedDate.charAt(0).toUpperCase();

      return (
        <View style={styles.dayContainer}>
          {/* Afficher la première lettre en majuscule suivie du reste de la chaîne */}
          <Text style={styles.dayText}>{firstLetterUpperCase + formattedDate.slice(1)}</Text>

        </View>
      );
    } 
  };

  const renderItem = (item, firstItemDay) => {

    if (firstItemDay) return <View/>
    else if (item.addButton) {
      return (
        <TouchableOpacity style={styles.addRecipe} onPress={handleAddRecipe}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: '#ffffff', width: "80%" }}>Ajouter une recette</Text>
          <FontAwesome style={{ marginLeft: 10 }} name='plus' size={25} color='#ffffff' />
        </TouchableOpacity>
      )
    } else {
      return (
        <Card style={styles.card}>
          <View style={styles.itemContainer}>
            <Text style={styles.textCard}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteRecipe(item.date, item.name)}>
              <FontAwesome style={{ marginLeft: 10 }} name='trash-o' size={25} color='#CC3F0C' />
            </TouchableOpacity>            
          </View>
        </Card>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={recipes}
        loadItemsForMonth={loadItems}
        selected={'2023-12-13'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={true}
        renderDay={renderDay}
        renderItem={renderItem}
        theme={{
          todayTextColor: '#CC3F0C',
          textDayFontWeight: '500',
        }}
      />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 27.5,
    marginLeft: 27.5,
    marginTop: 77,
    marginBottom: 10,
  },
  card:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  itemContainer: {
    flexDirection: 'row', 
    alignItems: 'center',  
    width: '80%',
  },
  item: {
    flex: 1,
  },
  textCard: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  dayContainer:{
    flex:1,
    witdh:'100%',
  },
  deleteRecipe: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 30,
  },
  addRecipe: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CC3F0C',
    marginTop: 30,
    marginLeft: 40,
    marginBottom:30,
    width: '60%',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dayText: {
    width:'100%',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});