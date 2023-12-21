import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import ROUTE from "../globals/nico";

export default function StoreCard(props) {
  const user = useSelector((state) => state.user);
  const [stores, setStores] = useState([]);
  //const [distance, setDistance] = useState(0);

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


  // Calculate the distance
  const distance = (storeCoordinates) => { 
    return calculateDistance(
    storeCoordinates[1],
    storeCoordinates[0],
    props.latitude,
    props.longitude
  );
  console.log(storeCoordinates)
  }

  console.log(`Distance to store: ${distance} km`);
 

  // Set the distance in state
  //setDistance(distance);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  return (
    <View style={styles.container}>
      {stores.map((store, index) => (
        <View key={index} style={styles.card}>
          <Image style={styles.logoStore} source={{ uri: store.store.logo }} />
          <View style={styles.infos}>
            <Text style={styles.name}>{store.store.name}</Text>
            <Text style={styles.distance}>{distance(store.store.coordinates.location.coordinates).toFixed(2)} km</Text>
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
