import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import ROUTE from "../globals/nico";

export default function StoreCard(props) {
  const user = useSelector((state) => state.user);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${ROUTE}/stores/lowestPrices`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredientsList: [],
        }),
      });
      const data = await response.json();
      setStores(data.response);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {stores.map((store, index) => (
        <View key={index} style={styles.card}>
          <Image style={styles.logoStore} source={{ uri: store.store.logo }} />
          <View style={styles.infos}>
            <Text style={styles.name}>{store.store.name}</Text>
            <Text style={styles.distance}>{props.distance} km</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#C9AFBD",
  },
  logoStore: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  infos: {
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B3B47",
  },
  distance: {
    fontSize: 16,
    color: "#4B3B47",
  },
});
