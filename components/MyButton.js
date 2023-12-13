import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const MyButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.textButton}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#CC3F0C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  textButton: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 20,
    alignSelf: "flex-start",
  },
});

export default MyButton;
