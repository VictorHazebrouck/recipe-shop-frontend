
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
 return (
   <View>
     <Text>Home Screen</Text>
     <Button
       title="Welcome to Home"
       onPress={() => navigation.navigate('TabNavigator')}
     />
   </View>
 );
} 