import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState} from 'react';

export default function PlanningScreen({ navigation }) {

  const [isChecked, setChecked] = useState(undefined);

  const handleNext = () => {
    navigation.navigate('FavStore');
  };

  return (
    <View style={styles.container}>      
      <View style={styles.containerTop}>
        <Text style={styles.title}>AFFICHAGE</Text>
      </View>
          <View style={styles.checkboxPlanning}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#4B3A47' : undefined} />
            <Text>
            Planifier les recettes dans un planning et avoir la liste de courses
            </Text>
          </View>
              <View style={styles.checkboxNoPlanning}>
              <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#4B3A47': undefined} />
              <Text>
                Sélectionner uniquement les recettes et obtenir la liste de courses
                </Text>
              </View>
                <TouchableOpacity style={styles.Next } onPress={handleNext}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: '#ffffff', textAlign: 'center' }}>SUIVANT</Text>
                </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#F9F8F8',
  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  checkboxPlanning: {
    flexDirection: "row",  
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#EE9F68',
    paddingHorizontal: 40,
    paddingVertical: 40,
    marginTop: 50,
  },
  checkboxNoPlanning: {
    flexDirection: "row",  
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  checkbox: {
    margin: 8,
  },
  Next: { 
    backgroundColor: '#CC3F0C',
    marginTop: 30,
    marginLeft: 40,
    width:'70%',
    borderRadius:5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})