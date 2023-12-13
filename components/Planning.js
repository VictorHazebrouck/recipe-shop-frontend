import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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


  const [items, setItems] = React.useState({});

  const loadItems = (day) => {

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Nom de la recette',
              height: Math.max(10, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000
    );
  }

  const renderDay = (day) => { 
    if (day) {
      const options = { weekday: 'long', day: 'numeric' };
      const formatter = new Intl.DateTimeFormat('fr-FR', options);
      const formattedDate = formatter.format(day);
  
      return (
        <Text style={styles.dayText}>{formattedDate}</Text>
      );
    }
  };

  const renderItem = (item) => {
    const isLastItemOfDay = items[item.day] && items[item.day].indexOf(item) === items[item.day].length - 1;
  
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
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2023-12-13'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={true}
        renderDay={renderDay}
        renderItem={renderItem}
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
    borderRadius:0,
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
