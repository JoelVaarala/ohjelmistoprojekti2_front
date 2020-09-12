import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwipeCards from './components/SwipeCards.js'
import MyProfile from './components/MyProfile'
import SwipingPage from './components/SwipingPage'
import Matches from './components/Matches'
import Chat from './components/Chat'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SwipingPage style={{flex: 1}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
