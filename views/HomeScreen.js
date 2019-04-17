import React from "react";
import {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  Alert,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadMore: false
    }

    var Datastore = require('react-native-local-mongodb');
    this.db = new Datastore({filename: 'marvel_db', autoload: true});
    this.page = 1;
    this.data = {};
    this.load = false;
    this._GetSuperHeroes(this.page);
  }

  static navigationOptions = ({ navigation })=> {
    return {
      title: 'Personajes de Marvel',
      headerStyle: {
        backgroundColor: '#ed462f'
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
      headerRight: (
        <Button
          onPress={()=>{navigation.navigate('Creditos')}}
          title="creditos"
          color="#ed462f"
        />
      ),
  };
};

  GoToCreditos() {
    const {navigate} = this.props.navigation;
    navigate('Creditos',{title:'hola'});
  }

  GetSectionListItem(item) {
    this.props.navigation.navigate('Detail', {name: item,title:item.name});
  }

  _GetSuperHeroes(page) {
    fetch(MARVEL.SERVER + '/v1/public/characters?apikey=' + MARVEL.APIKEY + '&ts=1&hash=7bc96ca05cfa39777526a04d92c65f32&offset=' + (
    (this.page - 1) * 20), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      this.page = page + 1;
      if (responseJson.data) {
        for (var i = 0; i < responseJson.data.results.length; i++) {
          var heroe = responseJson.data.results[i];
          var lbl = (heroe.name[0] + "").toUpperCase();
          if (!this.data.hasOwnProperty(lbl)) {
            this.data[lbl] = {
              title: lbl,
              data: []
            };
          }
          this.data[lbl].data.push({
            name: heroe.name,
            description: heroe.description,
            uri: heroe.thumbnail.path + '.' + heroe.thumbnail.extension,
            data: heroe
          });
          heroe.page = page;
          this.db.insert([heroe], function(err, newDocs) {});
        }
      }
      var daS = [];
      for (var i in this.data) {
        var t = this.data[i];
        daS.push(t);
      }
      this.setState({isLoading: false, dataSource: daS, loadMore: false});
    });
  }

  GetSuperHeroes(page) {
    var data = {};
    this.db.find({
      page: page
    }, (err, docs) => {
      if (err) {
        this._GetSuperHeroes(page);
      } else if (docs) {
        for (var i = 0; i < docs.length; i++) {
          var heroe = docs[i];
          var lbl = (heroe.name[0] + "").toUpperCase();
          if (!data.hasOwnProperty(lbl)) {
            data[lbl] = {
              title: lbl,
              data: []
            };
          }
          data[lbl].data.push({
            name: heroe.name,
            uri: heroe.thumbnail.path + '.' + heroe.thumbnail.extension
          });
        }
        var daS = [];
        for (var i in data) {
          var t = data[i];
          daS.push(t);
        }
        this.setState({isLoading: false, dataSource: daS});
      } else {
        this._GetSuperHeroes(page);
      }
    });

  }

  loadMoreFn() {
    if (this.state.loadMore == false) {
      this.setState({loadMore: true});
      setTimeout(() => {
        this._GetSuperHeroes(this.page);
      }, 500);
    }
  }

  _renderItem = ({item}) => (<TouchableHighlight onPress={this.GetSectionListItem.bind(this, item)}>
    <View style={styles.contentRow}>
      <Image style={styles.imagen} source={{
          uri: item.uri
        }}/>
      <Text style={styles.item}>{item.name}</Text>
    </View>
  </TouchableHighlight>);

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return (<View style={{
          flex: 1,
          padding: 20
        }}>
        <ActivityIndicator/>
      </View>)
    }
    var temp = this.state.loadMore
      ? (<ActivityIndicator/>)
      : <View/>;
    return (<View style={styles.container}>
      <SectionList
        onEndReached={() => this.loadMoreFn()}
        onEndReachedThreshold={0.5}
        sections={this.state.dataSource}
        renderItem={this._renderItem}
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => index}/>
       {temp}
    </View>);
  }
}

const MARVEL = {
  APIKEY: 'a5c794416112b78d1f94466a2270e251',
  PRIVATEKEY: 'e378401ce4ccb26618585c081526bfb8937479e9',
  SERVER: 'http://gateway.marvel.com'
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  imagen: {
    width: 50,
    height: 50
  },
  contentRow: {
    flexDirection: 'row',
    padding: 20
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})

export default HomeScreen;
