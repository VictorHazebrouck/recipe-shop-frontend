import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import SmallButton from "./SmallButton";
import ROUTE from "../globals/nico";
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
import { useDispatch, useSelector } from "react-redux";
import {
  modifyCurrentRecipe,
  addFavoriteRecipes,
  removeFavoriteRecipes,
} from "../reducers/user";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const screenWidth = Dimensions.get("window").width;

/**

@component
@param {Function} props.closeModal - Callback to close modal which englobes this component
@param {string} props.name
@param {number} props.preparationTime
@param {string} props.difficulty
@param {string} props._id
@param {string} props.imageURL
@param {string[]} props.instructions
@param {object[]} props.ingredients 
*/

const RecipeModal = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.credentials.token;
  const preferences = user.preferences.planningChecked;

  const [numberOfPers, setNumberOfPers] = useState(1);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [like, setLike] = useState("heart-o");
  const [difficulty, setDifficulty] = useState(1);
  const [isDatePickerVisibility, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const instructions = props.instructions;

  /**
   * @CALCULATE qty of ingredients
   */
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

  const handlePressPlus = () => {
    setNumberOfPers(numberOfPers + 1);
  };

  // FONCTIONS DE PARAMÉTRAGE DU PICKER (CHOIX DE LA DATE DE LA RECETTE)
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //function to add new recipe to bdd and navigate to planning
  const addRecipe = (date) => {
    fetch(`${ROUTE}/users/currentRecipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId: props._id,
        date: date,
        amount: numberOfPers,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(modifyCurrentRecipe(data.response));
        props.closeModal();
        navigation.navigate("Planning");
      });
  };
  //quand on confirme
  const handleConfirm = (date) => {
    const formattedDate = formatDate(date);
    addRecipe(formattedDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ajoute un zéro devant si nécessaire
    const day = date.getDate().toString().padStart(2, "0"); // Ajoute un zéro devant si nécessaire

    return `${year}-${month}-${day}`;
  };

  const ingredientQty = ingredientsList.map((e, i) => (
    <View key={i} style={styles.ingrendientCard}>
      <Text style={{ color: "#4B3B47", fontWeight: 600 }}>{e.name}</Text>
      <Text style={{ color: "#4B3B47" }}>
        {e.amount} {e.unit}
      </Text>
    </View>
  ));

  /**
   * @SET difficulty
   */
  useEffect(() => {
    if (props.difficulty === "Easy") {
      setDifficulty(1);
    } else if (props.difficulty === "Medium") {
      setDifficulty(2);
    } else {
      setDifficulty(3);
    }
  }, [props.difficulty]);

  const difficultyLvl = () => {
    const difficultyIcon = [];
    for (let i = 0; i < difficulty; i++) {
      difficultyIcon.push(
        <MaterialCommunityIcons
          key={i}
          name="chef-hat"
          size={20}
          color="#4B3B47"
        />
      );
    }
    return <View style={styles.difficultyIcon}>{difficultyIcon}</View>;
  };

  /**
   * @POST id, date et numberOfPers to database
   */

  const handleSubmit = () => {
    if (!preferences) {
      fetch(`${ROUTE}/users/currentRecipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeId: props._id,
          date: new Date(),
          amount: numberOfPers,
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(modifyCurrentRecipe(data.response));
          props.closeModal();
          navigation.navigate("Planning");
          setModalVisible(true);
        });
    } else if (props.chosenDay) {
      addRecipe(props.chosenDay);
    } else {
      showDatePicker();
    }
  };

  // POST favorite to databases
  const handleLike = () => {
    fetch(`${ROUTE}/users/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe: { _id: props._id }, token: token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addFavoriteRecipes({ _id: props._id }));
          //setLike("heart");
        } else {
          dispatch(removeFavoriteRecipes({ _id: props._id }));
          //setLike("heart-o");
        }
      });
  };

  // RENDER the recipeModal
  return (
    <View style={styles.container}>
      <View></View>
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
            <FontAwesome5 name={"fish"} size={20} color="#4B3B47" />
            <MaterialCommunityIcons
              name={"food-drumstick-off"}
              size={20}
              color="#4B3B47"
              style={{ marginVertical: 10 }}
            />
            <MaterialCommunityIcons name={"corn"} size={20} color="#4B3B47" />
          </View>
          <TouchableOpacity style={styles.like} onPress={handleLike}>
            <FontAwesome
              name={
                user.personalRecipes.favoriteRecipes.some(
                  (e) => e._id === props._id
                )
                ? "heart"
                : "heart-o"
              }
              size={20}
              color="#CC3F0C"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <View style={styles.name}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.h3}>{props.name}</Text>
              </View>
              {/* <View style={styles.note}>
                <FontAwesome name={"star"} size={16} color="#4B3B47" />
                <FontAwesome name={"star"} size={16} color="#4B3B47" />
                <FontAwesome name={"star"} size={16} color="#4B3B47" />
                <FontAwesome name={"star-o"} size={16} color="#4B3B47" />
                <FontAwesome name={"star-o"} size={16} color="#4B3B47" />
              </View> */}
            </View>
            <View style={styles.info}>
              <View style={styles.time}>
                <MaterialIcons name="access-time" size={20} color="#4B3B47" />
                <Text style={{ color: "#4B3B47" }}>
                  {props.preparationTime}mn
                </Text>
              </View>
              <View style={styles.difficulty}>
                {difficultyLvl()}
                <Text style={{ color: "#4B3B47" }}>{props.difficulty}</Text>
              </View>
            </View>
          </View>
          <View style={styles.number}>
            <TouchableOpacity onPress={() => handlePressMinus()}>
              <FontAwesome name={"minus-circle"} size={25} color="#4B3B47" />
            </TouchableOpacity>
            <Text style={styles.numberOfPers}>{numberOfPers}</Text>
            <TouchableOpacity onPress={() => handlePressPlus()}>
              <MaterialIcons name="add-circle" size={25} color="#4B3B47" />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: "#4B3B47", marginLeft: 10 }}>
              personnes
            </Text>
          </View>
          <View style={styles.ingredient}>
            <Text style={styles.h4}>Ingredient</Text>
            <View style={styles.ingrendientsList}>{ingredientQty}</View>
          </View>
          <View style={styles.preparation}>
            <Text style={styles.h4}>Preparation</Text>
            <Text style={{ color: "#4B3B47" }}>{instructions}</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <SmallButton name="ajouter" isPlain={true} onPress={handleSubmit} />

          <DateTimePickerModal
            isVisible={isDatePickerVisibility}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
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
    overflow: "hidden",
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
    marginBottom: 20,
  },
  name: {
    flex: 2,
  },
  h3: {
    fontSize: 30,
    color: "#4B3B47",
  },
  h4: {
    fontSize: 20,
    color: "#4B3B47",
    marginBottom: 10,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  note: {
    flexDirection: "row",
  },
  time: {
    alignItems: "center",
  },
  difficulty: {
    alignItems: "center",
  },
  difficultyIcon: {
    flexDirection: "row",
  },
  number: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  numberOfPers: {
    marginHorizontal: 10,
    fontSize: 20,
    color: "#4B3B47",
  },
  ingredient: {
    marginBottom: 20,
  },
  ingrendientCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  preparation: {
    marginBottom: 20,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecipeModal;
