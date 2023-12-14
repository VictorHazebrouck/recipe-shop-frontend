import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import ROUTE from '../globals/nico';

export default function PlanningScreen({ navigation }) {

  const handleAddRecipe = () => {
    navigation.navigate('Home');
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

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

  const [recipes, setRecipes] = useState({});

  const loadItems = (day) => {
    fetch(`${ROUTE}/users/recipes`)
      .then(response => response.json())
      .then(data => {
        const recettes = {};
        const receiveRecipesList = data.response.currentRecipes;
  
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
  
          recettes[strTime] = [];

          receiveRecipesList.forEach(recipe => {
            recettes[strTime].push({
              name: recipe.id.name
            });
          });
        }
  
        setRecipes(recettes);
      });
  }


  // const loadItems = (day) => {

  //   fetch(`${ROUTE}/users/recipes`)
  //     .then(response => response.json())
  //     .then(data => {

  //       const recettes = {} 
  //       const receiveRecipesList = data.response.currentRecipes

  //       for (let i = -15; i < 85; i++) {
  //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //         const strTime = timeToString(time);

  //         recettes[strTime] = [{},];

  //         receiveRecipesList.forEach(e => {

          
  //         const date = e.date(formatage)

  //         recettes[date].push({
  //           name: e.id.name
  //         });
  //       });
  //     }
  //       setRecipes(recettes)
  //     })
  // }

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
    const isLastItemOfDay = recipes[item.day] && recipes[item.day].indexOf(item) === recipes[item.day].length - 1;
    if (firstItemDay) return <View/> 
    return (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View>
              <Text style={styles.textCard}>{item.name}</Text>
              <TouchableOpacity >
              <FontAwesome style={{ marginLeft: 10 }} name='trash-o' size={25} color='#CC3F0C' />
            </TouchableOpacity>
            </View>
          </Card.Content>


        {isLastItemOfDay && (
          <TouchableOpacity style={styles.addRecipe} onPress={handleAddRecipe}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: '#4B3A47', width: "80%" }}>Ajouter une recette</Text>
            <FontAwesome style={{ marginLeft: 10 }} name='plus' size={25} color='#CC3F0C' />
          </TouchableOpacity>
        )}
        </Card>
    );
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
  item: {
    flex: 1,
    paddingVertical: 50,
    marginRight: 10,
    marginTop: 0,
    backgroundColor: 'red',
  },
  card: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 5,
    marginRight: 20,
  },
  dayContainer:{
    flex:1,
    witdh:'100%',
    backgroundColor:'yellow',
  },
  cardContent:{
    backgroundColor: 'red',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCard: {
    padding: 0,
    margin: 0,
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
    marginTop: 30,
    marginLeft: 40,
    width: '80%',
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
