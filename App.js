import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {

  // TODO: add font loading
  // const [loaded] = useFonts({
  //   Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  //   'DM-Sans': require('./assets/fonts/DM-Sans-Regular.ttf'),
  // });


  // TODO perform splash screen logics here (e.g. check if user is logged in, etc.)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
