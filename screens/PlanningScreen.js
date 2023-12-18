import { SafeAreaView, StyleSheet } from 'react-native';
import NoPlanning from '../components/NoPlanning';
import Planning from '../components/Planning';
import { useSelector } from 'react-redux';

export default function PlanningScreen({ navigation }) {

  //use selector planning type
  // conditional return

  const isPlanningChecked = useSelector(state => state.user.preferences.planningChecked); //planningChecked à adapter quand préférences seront gérées dans le reducer user

 return (
  <SafeAreaView style={styles.container}>
      {isPlanningChecked ? <Planning navigation = {navigation} /> : <NoPlanning navigation = {navigation} />} 
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