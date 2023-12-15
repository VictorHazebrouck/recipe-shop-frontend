import React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

const Ingredient = (props) => {
  return (
    <View style={styles.ingredientContainer}>
      <Text style={styles.name}>{props.name}</Text>
      <TextInput
        style={styles.qtyForRecipe}
        value={String(props.qtyForRecipe)}
        keyboardType="numeric"
      />
      <Text style={styles.unit}>{props.unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#937B8A",
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "400" },
  unit: { fontSize: 16, fontWeight: "400" },
  qtyForRecipe: {
    width: 70,
    height: 42,
    fontSize: 16,
    borderColor: "#937B8A",
    borderWidth: 1,
    fontWeight: "400",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});

export default Ingredient;
