import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import SwipeCards from './SwipeCards'

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function SwipingPage() {



  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <Text>TÄNNE NAVI</Text>
      </View>
      <View style={{ flex: 9, justifyContent: 'flex-start' }}>
        <SwipeCards />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Icon reverse name='cancel' />
        <Icon reverse name='info' />
        <Icon reverse name='favorite' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
