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

    fetch(`${ROUTE}/recipes`)
      .then(response => response.json())
      .then(data => {

        const recettes = {} 

        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);

          recettes[strTime] = [];
          recettes[strTime].push({
            name: data.res[0].name
          }
          )
        }
        setRecipes(recettes)
      })
  }
  console.log(recipes)

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

  const renderItem = (item) => {
    const isLastItemOfDay = recipes[item.day] && recipes[item.day].indexOf(item) === recipes[item.day].length - 1;

    return (
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>

        {isLastItemOfDay && (
          <TouchableOpacity style={styles.addRecipe} onPress={handleAddRecipe}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: '#4B3A47', width: "80%" }}>Ajouter une recette</Text>
            <FontAwesome style={{ marginLeft: 10 }} name='plus' size={25} color='#CC3F0C' />
          </TouchableOpacity>
        )}
      </View>
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
    backgroundColor: '#EE9F68',
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
    borderRadius: 0,
    backgroundColor: 'green',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
