import React from "react";
import { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

const Ingredient = (props) => {
  const [input, setInput] = useState(String(props.qtyForRecipe));
  return (
    <View style={styles.ingredientContainer}>
      <Text style={styles.name}>{props.name}</Text>
      <View
        style={{
          width: 200,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{ width: 120, flexDirection: "row", alignItems: "center" }}
        >
          <TextInput
            style={styles.qtyForRecipe}
            onChangeText={(value) => setInput(value)}
            value={input}
            keyboardType="numeric"
          />
          <Text style={styles.unit}>{props.unit}</Text>
        </View>
        <Text style={styles.price}>100€</Text>
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
  name: { fontSize: 16, fontWeight: "400", color: "#937B8A" },
  unit: { fontSize: 16, fontWeight: "400", color: "#937B8A" },
  price: { fontSize: 16, fontWeight: "600", color: "#937B8A" },
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
