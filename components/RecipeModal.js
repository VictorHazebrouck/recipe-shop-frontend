import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MyButton from "./MyButton";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const RecipeModal = (props) => {
  const [numberOfPers, setNumberOfPers] = useState(1);
  const [ingredientsList, setIngredientsList] = useState([]);

  const instructions = props.instructions;

  useEffect(() => {
    const updatedIngredientsList = props.ingredients.map((ingredient) => ({
      unit: ingredient.id.unit,
      name: ingredient.id.name,
      amount: ingredient.amount * numberOfPers,
    }));
    setIngredientsList(updatedIngredientsList);
  }, [numberOfPers]);

  const handlePressMinus = () => {
    if (numberOfPers > 1) {
      setNumberOfPers(numberOfPers - 1);
    }
  };
  const handlePressBonus = () => {
    setNumberOfPers(numberOfPers + 1);
  };

  const handleSubmit = () => {
    console.log(ingredientsList);
  };

  const ingredientQty = ingredientsList.map((e, i) => (
    <View key={i} style={styles.ingrendientCard}>
      <Text>{e.name}</Text>
      <Text>
        {e.amount} {e.unit}
      </Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: props.imageURL }}></Image>
          <TouchableOpacity
            onPress={props.closeModal}
            style={styles.closeModal}
          >
            <FontAwesome name={"close"} size={25} color="#4B3B47" />
          </TouchableOpacity>
          <View style={styles.regime}>
            <FontAwesome5 name={"fish"} size={16} color="#4B3B47" />
            <MaterialCommunityIcons
              name={"food-drumstick-off"}
              size={16}
              color="#4B3B47"
            />
            <MaterialCommunityIcons name={"corn"} size={16} color="#4B3B47" />
          </View>
          <View style={styles.like}>
            <Fontisto name={"favorite"} size={20} color="#CC3F0C" />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <View style={styles.name}>
              <Text>{props.name}</Text>
              <View style={styles.note}>
                <FontAwesome name={"star"} size={16} color="#4B3B47" />
                <FontAwesome name={"star"} size={16} color="#4B3B47" />
                <FontAwesome name={"star"} size={16} color="#4B3B47" />
                <FontAwesome name={"star-o"} size={16} color="#4B3B47" />
                <FontAwesome name={"star-o"} size={16} color="#4B3B47" />
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.time}>
                <MaterialIcons name="access-time" size={20} color="#4B3B47" />
                <Text>{props.preparationTime}mn</Text>
              </View>
              <View style={styles.difficulty}>
                <MaterialCommunityIcons
                  name="chef-hat"
                  size={20}
                  color="#4B3B47"
                />
                <Text>{props.difficulty}</Text>
              </View>
            </View>
          </View>
          <View style={styles.number}>
            <TouchableOpacity onPress={() => handlePressMinus()}>
              <FontAwesome name={"minus-circle"} size={20} color="#4B3B47" />
            </TouchableOpacity>
            <Text style={styles.numberOfPers}>{numberOfPers}</Text>
            <TouchableOpacity onPress={() => handlePressBonus()}>
              <MaterialIcons name="add-circle" size={20} color="#4B3B47" />
            </TouchableOpacity>
            <Text>personnes</Text>
          </View>
          <View style={styles.ingredient}>
            <Text style={styles.h4}>Ingredient</Text>
            <View style={styles.ingrendientsList}>{ingredientQty}</View>
          </View>
          <View style={styles.preparation}>
            <Text style={styles.h4}>Preparation</Text>
            <Text>{instructions}</Text>
          </View>
          <View style={styles.btnContainer}>
            <MyButton name="ajouter" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  imgContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  regime: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
  },
  like: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 20,
    bottom: 20,
    right: 20,
    padding: 10,
  },
  closeModal: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    flexDirection: "row",
  },
  name: {
    flex: 2,
  },
  info: {
    flex: 1,
    flexDirection: "row",
  },
  note: {
    flexDirection: "row",
  },
  h4: {
    fontSize: 20,
  },
  number: {
    flexDirection: "row",
  },
  numberOfPers: {
    marginHorizontal: 10,
  },
  ingrendientCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecipeModal;
