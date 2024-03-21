import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';

const Quots = () => (
  <View style={[styles.container, styles.horizontal]}>
    <StatusBar  backgroundColor="#1a1a1a"/>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#1a1a1a"

  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Quots;