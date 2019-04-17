import React from "react";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from "./views/HomeScreen";
import DetailScreen from "./views/DetailScreen";
import Creditos from "./views/CreditosScreen";

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Detail: {
    screen: DetailScreen
  },
  Creditos: {
    screen: Creditos
  }
});

const App = createAppContainer(MainNavigator);

export default App;
