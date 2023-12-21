import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import AgendaDay from "./AgendaDay";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 * AgendaScroll component displays a scrollable agenda with specified start and end days.
 *
 * @component
 * @param {number} startDay - The start day of the agenda (default is 15).
 * @param {number} referenceDay - The reference day in milliseconds since the Unix epoch (default is Date.now()).
 * @param {number} endDay - The end day of the agenda (default is 15).
 * @param {Object} data - The data Object to use as reference for the agenda, MUST follow the following guidelines
 *      - 'date' keys must be of format YYYY-MM-DD
 *      - 'date' keys must store your data for a specific day in an array (even if only one item)
 *      - 'date' keys must be unique (only one for each day)
 * @param {Function} onRefreshPast - Callback function triggered when refreshing past agenda items.
 * @param {Function} onRefreshFuture - Callback function triggered when refreshing future agenda items.
 * @param {Function} renderDay(day, data) - Callback to render the day content.
 * @param {Function} renderItem(day, itemData, index) - Callback to render an item for the day.
 * @param {Function} renderCommonLastItem(day, data) - Callback to render a common last item for the day.
 *
 * @returns {React.JSX} The rendered AgendaScroll component.
 */
const AgendaScroll = ({
  startDay = 15,
  referenceDay = Date.now(),
  endDay = 15,
  data,
  onRefreshPast,
  onRefreshFuture,
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
    ref.push(<AgendaDay key={i} day={key} data={daysData[key]} {...rest} />);
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => onRefreshPast()}
      >
        <FontAwesome name="caret-up" size={30} color="#CC3F0C" />
      </TouchableOpacity>
      {ref}
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => onRefreshFuture()}
      >
        <FontAwesome name="caret-down" size={30} color="#CC3F0C" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default AgendaScroll;
