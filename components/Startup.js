//import { auth } from 'firebase-admin';
import React from "react";
import { View, AsyncStorage, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import styles from "../styles";
import { AuthContext } from './AuthContext';


export default function Startup({ navigation }) {

  const [kayttaja, setKayttaja] = React.useState("user@example.com");
  const [salasana, setSalasana] = React.useState("secretPassword");
  const [msg, setMsg] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Input
        containerStyle={styles.paddingTopHundred}
        lable="Käyttäjätunnus"
        placeholder="Käyttäjätunnus"
        onChangeText={(kayttaja) => setKayttaja(kayttaja)}
        value={kayttaja}
      />
      <Input lable="Salasana" placeholder="Salasana" secureTextEntry={true} onChangeText={(salasana) => setSalasana(salasana)} value={salasana} />
      <Button buttonStyle={styles.backgroundTheme} onPress={() => signIn(kayttaja, salasana)} title="Login" containerStyle={styles.paddingHorizontalTen} />
      <Text>{msg}</Text>

      <Button
        buttonStyle={styles.backgroundTheme}
        onPress={() => navigation.navigate("Rekisteröidy")}
        title="Register user"
        containerStyle={styles.paddingHorizontalTen}
      />

      <Button
        buttonStyle={styles.backgroundTheme}
        onPress={() => signOut()}
        title="Sign out"
        containerStyle={styles.paddingHorizontalTen}
      />
    </View>
  );
}
