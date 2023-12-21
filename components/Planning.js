import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AgendaScroll from "./AgendaScroll";
import { Card } from "react-native-paper";
import { modifyCurrentRecipe } from "../reducers/user";
import ROUTE from "../globals/nico";
import RecipeModal from "./RecipeModal";
import { ScreenWidth } from "react-native-elements/dist/helpers";

const screenWidth = Dimensions.get("window").width;

export default function PlanningScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const currentRecipes = user.plannedRecipes.currentRecipes;

  const [data, setData] = useState({});
  const [startDay, setStartDay] = useState(0);
  const [endDay, setEndDay] = useState(15);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecipe, setCurentRecipe] = useState(null);
  const [forceRerender, setForceRerender] = useState(false)

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

  const handleAddRecipe = (day) => {
    setForceRerender(!forceRerender)
    navigation.navigate("Home", {day, forceRerender});
  };

  const handleDeleteRecipe = async (itemData) => {
    const response = await fetch(`${ROUTE}/users/currentRecipes`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: itemData._id, token: token }),
    });
    const data = await response.json();
    dispatch(modifyCurrentRecipe(data.response));
  };

  handleRefreshPast = () => {
    setStartDay(startDay + 15);
  };
  handleRefreshFuture = () => {
    setEndDay(endDay + 15);
  };

  const handleModal = (itemData) => {
    setCurentRecipe(itemData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderDay = (day) => {
    const options = { weekday: "long", day: "numeric" };
    const formattedDate = new Date(day).toLocaleDateString("fr-FR", options);
    const capitalizedDay =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
      <View style={styles.dayContainer}>
        <View style={styles.separation}></View>
        <Text style={styles.dayText}>{capitalizedDay}</Text>
      </View>
    );
  };

  const renderCommonLastItem = (day, dayData) => {
    return (
      <TouchableOpacity
        style={styles.addRecipe}
        onPress={() => handleAddRecipe(day)}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#fff",
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
      <View style={styles.card} key={i}>
        <Card.Content style={styles.cardContent}>
          <TouchableOpacity onPress={() => handleModal(itemData.id)}>
            <Text style={styles.textCard}>{itemData.id.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteRecipe(itemData)}>
            <FontAwesome
              style={{ marginLeft: 10 }}
              name="trash"
              size={25}
              color="#937B8A"
            />
          </TouchableOpacity>
        </Card.Content>
        <Modal visible={modalVisible} animationType="slide">
          <RecipeModal {...currentRecipe} closeModal={closeModal}></RecipeModal>
        </Modal>
      </View>
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
    ></AgendaScroll>
  );
}

const styles = StyleSheet.create({
  addRecipe: {
    flexDirection: "row",
    backgroundColor: "#CC3F0C",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-end",
    marginVertical: 20,
  },
  card: {
    alignSelf: "flex-end",
    marginBottom: 10,
    maxWidth: 250,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#937B8A",
    borderRadius: 3,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textCard: {
    color: "#937B8A",
    flexWrap: "wrap",
  },
  dayContainer: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  dayText: {
    fontSize: 30,
    fontFamily: "Anton-reg",
    color: "#4B3B47",
    textAlign: "left",
  },
  separation: {
    height: 1,
    width: ScreenWidth - 40,
    backgroundColor: "#4B3B47",
  },
});
