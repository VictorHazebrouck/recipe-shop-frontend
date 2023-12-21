import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

const AgendaDay = ({
  day,
  data = [],
  renderDay,
  renderItem,
  renderCommonLastItem,
}) => {
  const ref = data.map((itemData, index) => {
    return renderItem(day, itemData, index);
  });

  return (
    <View style={styles.container}>
      {renderDay(day, data)}
      {ref}
      {renderCommonLastItem(day, data)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    alignItems: "center",
  },
});

export default AgendaDay;
