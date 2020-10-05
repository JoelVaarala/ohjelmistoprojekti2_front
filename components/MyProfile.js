import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button} from "react-native";
import { Icon, Avatar} from "react-native-elements";

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function MyProfile({navigation}) {
  const [count, setCount] = React.useState("");

  const onPress = () => setCount("KUVA AVAUTUU");



  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text value={{ count }}>{count}</Text>

        <Avatar size="xlarge" rounded source={{ uri: "https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_960_720.jpg" }} />

        <Text style={{ fontSize: 20, top: 5 }}>Nimi, ikä</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", top: 20 }}>
        <View>
          <Icon onPress={() => navigation.navigate('Settings')} size={28} reverse name="settings" />
          <Text>Asetukset</Text>
        </View>
        <View>
          <Icon size={28} reverse name="image" />
          <Text>Lisää kuva</Text>
        </View>
        <View>
          <Icon onPress={() => navigation.navigate('EditProfile')} size={28} reverse name="edit" />
          <Text>Omat tiedot</Text>
        </View>
      </View>
      <View>
        <Button onPress={() => navigation.navigate('Add_Event')} title="add event"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
