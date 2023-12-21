// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
// import ROUTE from "../globals/nico";

export default function StoreCard(props) {
  const favoriteStore = useSelector(
    (state) => state.user.preferences.favoriteStore
  );

  let conditionalStyle = {};
  if (favoriteStore === props.storeId) {
    conditionalStyle = { backgroundColor: "#EE9F68" };
  }
  // Calculate the distance
  const distance = () => {
    return calculateDistance(
      props.coordinates.location.coordinates[1],
      props.coordinates.location.coordinates[0],
      props.latitude,
      props.longitude
    );
  };

  //Set the distance in state
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
      <TouchableOpacity
        style={{ ...styles.card, ...conditionalStyle }}
        onPress={() => props.handleFavStore(props.storeId)}
      >
        <Image style={styles.logoStore} source={{ uri: props.logo }} />
        <View style={styles.infos}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.distance}>{distance().toFixed(2)} km</Text>
        </View>
      </TouchableOpacity>
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
