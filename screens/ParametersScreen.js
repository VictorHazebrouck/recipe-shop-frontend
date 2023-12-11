import { SafeAreaView, Button, StyleSheet, Text, View } from 'react-native';

export default function ParametersScreen({ navigation }) {

return (
  <SafeAreaView style={styles.container}>
    {/* <Text style={styles.title}>{user.name}'s places</Text> */}

    <View style={styles.button}>
      <Button
        title="Regime"
        onPress={() => navigation.navigate('Regime')}
      />
      <Button
        title="Gouts"
        onPress={() => navigation.navigate('Gouts')}
      />
      <Button
        title="Affichage"
        onPress={() => navigation.navigate('Affichage')}
      />
      <Button
        title="Magasin Favori"
        onPress={() => navigation.navigate('FavStore')}
      />
            <Button
        title="Manage account"
        onPress={() => navigation.navigate('ManageAccount')}
      />
   </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
