import { Button, StyleSheet, Text, View } from 'react-native';

export default function ParametersScreen({ navigation }) {
 return (
   <View>
     <Text>Parameters Screen</Text>
     <Button
       title="Go to Home"
       onPress={() => navigation.navigate('TabNavigator')}
     />
   </View>
 );
}