import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements'


//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function EditProfile() {


  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text>TÄNNE NAVI</Text>
      </View>

      <View style={{ flex: 7, alignItems:'center' }}>
        <Icon reverse name='image' />
        <Text>Lisää kuva</Text>

        <Input label='Tietoja sinusta' />
        <Input label='Asuinpaikka' />
       
       

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
