import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const LargeButton = ({
  onPress,
  name = "button",
  isPlain,
  styleButton = {},
  styleText = {},
}) => {
  const buttonStyle = isPlain
    ? StyleSheet.compose(styles.buttonPlain, styleButton)
    : StyleSheet.compose(styles.buttonNotPlain, styleButton);

  const textStyle = isPlain
    ? StyleSheet.compose(styles.textButtonPlain, styleText)
    : StyleSheet.compose(styles.textButtonNotPlain, styleText);

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPlain: {
    backgroundColor: "#CC3F0C",
    width: 280,
    height: 53,
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
  },
  buttonNotPlain: {
    backgroundColor: "#fff",
    width: 280,
    height: 53,
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
  },
});

export default LargeButton;
