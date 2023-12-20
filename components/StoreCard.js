import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import ROUTE from "../globals/nico";

export default function StoreCard(props) {
  const user = useSelector((state) => state.user);
  const [stores, setStores] = useState([])

useEffect(() => {
  (async () => {
  const response = await fetch(`${ROUTE}/stores/lowestPrices`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredientsList: [] 
    }),
  });
  const data = await response.json();
  setStores(data.response)
})()
},[])



return (
  <ScrollView>
    {stores.map((store, index) => (
      <View key={index} style={styles.container}>
        <Image
          style={styles.logoStore}
          source={{
            uri: store.store.logo,
          }}
        />
        <View>
          <Text style={styles.name}>{store.store.name}</Text>
          <Text style={styles.distance}>{props.distance} km</Text>
        </View>
      </View>
    ))}
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: '80%',
    
  },
  name: { 
    fontSize: 18, 
    fontWeight: "800", 
    color: "#333", 
  },
  distance: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#937B8A" 
  }, 
  logoStore: {
    width: 80,
    height: 80,
  },
});
