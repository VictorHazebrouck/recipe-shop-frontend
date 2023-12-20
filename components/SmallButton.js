import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SmallButton = ({
  onPress,
  name = "button",
  isPlain,
  styleButton = {},
  styleText = {},
}) => {
  // if (isPlain) {
  //   return (
  //     <TouchableOpacity
  //       style={{ ...styles.buttonPlain, ...styleButton }}
  //       onPress={onPress}
  //     >
  //       <Text style={{ ...styles.textButtonPlain, ...styleText }}>{name}</Text>
  //     </TouchableOpacity>
  //   );
  // } else {
  //   return (
  //     <TouchableOpacity
  //       style={{ ...styles.buttonNotPlain, ...styleButton }}
  //       onPress={onPress}
  //     >
  //       <Text style={{ ...styles.textButtonNotPlain, ...styleText }}>
  //         {name}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // }
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
  },
});

export default SmallButton;