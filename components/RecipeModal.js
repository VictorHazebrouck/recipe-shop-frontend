import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const RecipeModal = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image}></Image>
      <TouchableOpacity onPress={props.closeModal}>
        <FontAwesome name={"close-circle"} size={25} color="#000" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>modal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    backgroundColor: "#fff",
  },
  image: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderRadius: 20,
  },
});

export default RecipeModal;
