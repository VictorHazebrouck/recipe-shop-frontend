import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";

export default function StoreCard(props) {
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.ingredientContainer}>
      <Image style={styles.logoStore}
        source={{
          uri: props.uri,
        }}
      />
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.name}>{props.distance}</Text>
      </View>
    </View>
  );
}

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
  logoStore: {
    width: 50,
    height: 50,
  },
});
