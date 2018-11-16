'use strict';
import React, { Component } from 'react';
import {
  Platform,
  //StyleSheet,
  //Text,
  //View
} from 'react-native';

import {
  createStackNavigator,
} from 'react-navigation';
import start from './start';
import home from './home';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
// class SearchPage extends Component<Props> {
//   static navigationOptions = {
//       "title":"Property Finder",
//     };
//   render() {
//     return <Text style={styles.description}>Tìm Nhà để mua</Text>;
//   }
// }

const App = createStackNavigator({
  Home: {screen: home},
  Start: {screen: start},
});
export default App;