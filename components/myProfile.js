import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function MyProfile() {

  const [count, setCount] = React.useState('')
  const onPress = () => setCount("KUVA AVAUTUU");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text>TÄNNE NAVI</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text value={{ count }} >{count}</Text>

        <Avatar size='xlarge' rounded source={{ uri: "https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_960_720.jpg" }} />

        <Text>Nimi, ikä</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
        <View>
          <Icon reverse name='settings' />
          <Text>Asetukset</Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <Icon reverse name='image' />
          <Text>Lisää kuva</Text>
          
        </View>
        <View>
          <Icon reverse name='edit' />
          <Text>Omat tiedot</Text>
        </View>
      </View>
      <View style={{ flex: 2 }}>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});
