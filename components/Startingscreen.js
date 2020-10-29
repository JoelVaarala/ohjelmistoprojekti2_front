import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

//Tässä käyttäjä rekisteröityy jos ei ole valideja tunnuksia tallessa, muutoin tämä ruutu skipataan kun validointi tehty
export default function StartingScreen() {
  return (
    <View style={[styles.container, styles.containerCenter]}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}