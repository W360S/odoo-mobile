import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HomeStack } from './Router'

console.disableYellowBox = true

export default class App extends Component {
  render() {
    return (
      <HomeStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
