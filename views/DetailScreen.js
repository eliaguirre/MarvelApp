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

class DetailScreen extends React.Component {


  static navigationOptions = ({ navigation }) => {
     return {
       title: navigation.getParam('title', 'Personaje'),
       headerStyle: {
         backgroundColor: '#ed462f'
       },
       headerTintColor: '#000000',
       headerTitleStyle: {
         fontWeight: 'bold',
         color: 'white',
       }
     };
   };
/*
  static navigationOptions = {
    title: 'Personaje',
    headerStyle: {
      backgroundColor: '#ed462f'
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
    }
  };*/

  _keyExtractor = (item, index) => item.name;

  _renderItem = ({item}) => (
      <Text style={styles.item}>{item.name}</Text>
    );

  render() {
    const {navigation} = this.props;
    const data = navigation.getParam('name', 'NO-name');
    DetailScreen.navigationOptions.title = data.name;

    var temp1 = data.data.comics.available > 0
      ? (<FlatList data={data.data.comics.items} keyExtractor={this._keyExtractor} renderItem={this._renderItem}/>)
      : <Text>No hay registrados</Text>;
    var temp2 = data.data.series.available > 0
      ? (<FlatList data={data.data.series.items} keyExtractor={this._keyExtractor} renderItem={this._renderItem}/>)
      : <Text>No hay registrados</Text>;
    return (<ScrollView>
      <View style={{ flexDirection: 'row',   padding: 20 }}>
        <Image style={styles.imagen} source={{ uri: data.uri }}/>
        <Text style={{
            paddingTop: 15,
            paddingLeft: 15
          }}>{data.name}</Text>
      </View>
      <View>
        <Text style={{ padding: 20 }} >{data.description}</Text>
        <Text style={styles.section}>Comics</Text>
        {temp1}
        <Text style={styles.section}>Series</Text>
        {temp2}
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})

export default DetailScreen;
