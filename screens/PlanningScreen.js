import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NoPlanning from '../components/NoPlanning';
import Planning from '../components/Planning';
//import { useSelector } from 'react-redux';

export default function PlanningScreen({ navigation }) {

  // const isPlanningChecked = useSelector(state => state.isPlanningChecked);
  // const isNoPlanningChecked = useSelector(state => state.isNoPlanningChecked);
  const isNoPlanningChecked = false
  const isPlanningChecked = true

  //use selector planning type
  // conditional return

 return (
  <SafeAreaView style={styles.container}>
      {isPlanningChecked && <Planning navigation = {navigation} />}
      {isNoPlanningChecked && <NoPlanning navigation = {navigation} />}
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});