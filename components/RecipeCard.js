import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const RecipeCard = (props) => {
  return (
    <TouchableOpacity onPress={() => props.handlePressCard(props)}>
      <View style={styles.recipesContainer}>
        <View style={styles.photo}>
          <Text style={styles.text}>test</Text>
          <TouchableOpacity>
            <FontAwesome name={"heart"} size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipesContainer: {
    height: (screenWidth * 58) / 100,
    width: (screenWidth * 48) / 100,
    backgroundColor: "red",
    margin: "1%",
    flexDirection: "column-reverse",
  },
  photo: {
    flexDirection: "row",
    backgroundColor: "white",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  text: { fontSize: 16, fontWeight: "800", width: "72%" },
});

export default RecipeCard;
