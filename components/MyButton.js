import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const MyButton = ({
  onPress,
  name = "button",
  isPlain,
  styleButton = {},
  styleText = {},
}) => {
  if (isPlain) {
    return (
      <TouchableOpacity
        style={{ ...styles.buttonPlain, ...styleButton }}
        onPress={onPress}
      >
        <Text style={{ ...styles.textButtonPlain, ...styleText }}>{name}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ ...styles.buttonNotPlain, ...styleButton }}
        onPress={onPress}
      >
        <Text style={{ ...styles.textButtonNotPlain, ...styleText }}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  buttonPlain: {
    backgroundColor: "#CC3F0C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CC3F0C",
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonPlain: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 20,
    alignSelf: "flex-start",
  },
  buttonNotPlain: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CC3F0C",
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonNotPlain: {
    color: "#CC3F0C",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 20,
    alignSelf: "flex-start",
  },
});

export default MyButton;
