import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ListView,
  FlatList
} from "react-native";

class CreditosScreen extends React.Component {

  static navigationOptions = {
    title: 'Creditos',
    headerStyle: {
      backgroundColor: '#ed462f'
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    }
  };

  render() {
    return (<ScrollView>
      <View>
        <Text style={styles.section}>Desarrollador por:</Text>
        <Text style={styles.text}>Felix Eli Lopez Aguirre</Text>
        <Text style={styles.text}>Web and Mobile developer</Text>
        <Text style={styles.section}>Tecnologias</Text>
        <Text style={styles.text}>React Native 0.59.4</Text>
        <Text style={styles.text}>Marvel API v1</Text>
      </View>
    </ScrollView>);
  }
}

const styles = StyleSheet.create({
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  imagen: {
    width: 50,
    height: 50
  },
  text: {
    padding: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})

export default CreditosScreen;
