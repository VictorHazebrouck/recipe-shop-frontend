import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import AgendaDay from "./AgendaDay";

/**
 * AgendaScroll component displays a scrollable agenda with specified start and end days.
 *
 * @component
 * @param {number} [startDay=15] - The start day of the agenda (default is 15).
 * @param {number} referenceDay - The reference day in milliseconds since the Unix epoch (default is Date.now()).
 * @param {number} [endDay=15] - The end day of the agenda (default is 15).
 * @param {Object} data - The data Object to use as reference for the agenda, MUST follow the following guidelines
 *      @property {Array} date1 - 'date' keys must be of format YYYY-MM-DD
 *      @property {Array} date2 - 'date' keys store your data for a specific day in an array
 *      @property {Array} ... - 'date' keys must be unique (only one for each day)
 * @param {Function} onRefreshPast - Callback function triggered when refreshing past agenda items.
 * @param {Function} onRefreshFuture - Callback function triggered when refreshing future agenda items.
 *
 * @returns {React.JSX} The rendered AgendaScroll component.
 */
const AgendaScroll = ({
  startDay = 15,
  referenceDay = Date.now(),
  endDay = 15,
  data,
  ...rest
}) => {
  const [daysData, setDaysData] = useState({});
  const [newDate] = useState(referenceDay);

  //concat empty days for the specified period with provided data for specific dates
  useEffect(() => {
    const refDays = {};
    for (let i = -startDay; i < endDay; i++) {
      const time = newDate + i * 24 * 60 * 60 * 1000;
      const strTime = new Date(time).toISOString().split("T")[0];
      refDays[strTime] = [];
    }
    setDaysData({ ...refDays, ...data });
  }, [startDay, endDay, data]);

  //display each date and send it relevant data
  let ref = [];
  Object.keys(daysData).forEach((key, i) => {
    ref.push(
        <AgendaDay
          key={i}
          day={key}
          data={daysData[key]}
          {...rest}
        />
      );
  });

  return (
    <ScrollView style={styles.container}>
      <Button title="load past items" onPress={() => onRefreshPast()} />
      {ref}
      <Button title="load future items" onPress={() => onRefreshFuture()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default AgendaScroll;
