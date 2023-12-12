import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const RecipeModal = (props) => {
  return (
    <TouchableOpacity
      style={styles.modalContainer}
      activeOpacity={1}
      onPress={props.closeModal}
    >
      <View style={styles.modal}>
        <Text>modal</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    backgroundColor: "rgba(0,0,0,.4)",
  },
  modal: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderRadius: 20,
  },
});

export default RecipeModal;
