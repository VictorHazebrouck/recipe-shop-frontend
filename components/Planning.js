import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AgendaScroll from "./AgendaScroll";
import { Card } from 'react-native-paper';
import { modifyCurrentRecipe } from "../reducers/user";
import ROUTE from "../globals/nico";

export default function PlanningScreen({ navigation }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const currentRecipes = user.plannedRecipes.currentRecipes;

  const [data, setData] = useState({});
  const [startDay, setStartDay] = useState(15);
  const [endDay, setEndDay] = useState(15);

  const handleAddRecipe = (day) => {
    console.log(day);
  };

  const handleDeleteRecipe = async (itemData) =>{
    console.log(itemData._id);
    const response = await fetch(`${ROUTE}/users/currentRecipes`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: itemData._id, token: token }),
    });
    const data = await response.json();
    dispatch(modifyCurrentRecipe(data.response));
  }

  useEffect(() => {
    const ref = {};
    currentRecipes.forEach((e) => {
      const date = e.date.split("T")[0];
      if (ref[date]) {
        ref[date].push(e);
      } else {
        ref[date] = [e];
      }
    });
    setData(ref);
  }, [currentRecipes]);

  handleRefreshPast = () => {
    setStartDay(startDay + 15);
  };
  handleRefreshFuture = () => {
    setEndDay(endDay + 15);
  };

  const renderDay = (day) => {
    return (
      <View style={styles.dayContainer}>
        {/* Afficher la première lettre en majuscule suivie du reste de la chaîne */}
        <Text style={styles.dayText}>{day}</Text>
      </View>
    );
  };

  const renderCommonLastItem = (day, dayData) => {
    return (
      <TouchableOpacity style={styles.addRecipe} onPress={() => handleAddRecipe(day)}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#ffffff",
            width: "80%",
          }}
        >
          Ajouter une recette
        </Text>
        <FontAwesome
          style={{ marginLeft: 10 }}
          name="plus"
          size={25}
          color="#ffffff"
        />
      </TouchableOpacity>
    );
  };

  const renderItem = (day, itemData, i) => {
    return (
      <Card style={styles.card} key={i}>
        <Card.Content>
          <View style={styles.itemContainer}>
            <Text style={styles.textCard}>{itemData.id.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteRecipe(itemData)}>
              <FontAwesome
                style={{ marginLeft: 10 }}
                name="trash-o"
                size={25}
                color="#CC3F0C"
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <AgendaScroll
      data={data}
      onRefreshPast={handleRefreshPast}
      onRefreshFuture={handleRefreshFuture}
      startDay={startDay}
      referenceDay={Date.now()}
      endDay={endDay}
      renderDay={renderDay}
      renderItem={renderItem}
      renderCommonLastItem={renderCommonLastItem}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "green",
    height: 30,
    width: "100%",
  },
  lastItem: {
    flex: 1,
    backgroundColor: "red",
    height: 30,
    width: "100%",
  },
  day: {
    flex: 1,
    backgroundColor: "blue",
    height: 30,
    width: "100%",
  },
  addRecipe: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CC3F0C",
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 70,
    marginRight: 40,
    width: "60%",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
    width: "90%"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  textCard: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  dayContainer:{
    flex:1,
    witdh:'100%',
  },
  dayText: {
    width:'100%',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});
