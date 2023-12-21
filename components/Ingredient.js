import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Ingredient = (props) => {
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(props.qtyForRecipe.toString());
  }, [props.qtyForRecipe]);

  return (
    <View style={styles.ingredientContainer}>
      <Text style={styles.name}>{props.name}</Text>
      <View style={styles.infos}>
        <View style={styles.qtyContainer}>
          <TextInput
            style={styles.qtyForRecipe}
            onChangeText={(value) => setInput(value)}
            value={input}
            keyboardType="numeric"
          />
          <Text style={styles.unit}>{props.unit}</Text>
        </View>
        <Text style={styles.price}>{props.price} €</Text>
        <TouchableOpacity
          onPress={() => props.handleDeleteIngredient(props.name)}
        >
          <FontAwesome name="trash" size={25} color="#402B3D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#937B8A",
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "400", color: "#937B8A", flex: 1 },
  unit: { fontSize: 16, fontWeight: "400", color: "#937B8A" },
  infos: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  qtyContainer: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#937B8A",
    marginHorizontal: 10,
  },
  qtyForRecipe: {
    width: 70,
    height: 42,
    fontSize: 16,
    borderColor: "#937B8A",
    borderWidth: 1,
    color: "#937B8A",
    fontWeight: "400",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default Ingredient;
