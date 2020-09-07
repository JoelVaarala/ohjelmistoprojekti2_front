import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


//Käyttäjä asettaa tällä sivulla tagi filtterit, etäisyyden, sukupuolen(?) ja tapahtuma-ajan (2,4,8,24,72h päästä?)
export default function MyFilters() {
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
