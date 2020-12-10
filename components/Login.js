import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import styles from "../styles";
import { AuthContext } from './AuthContext';


export default function Login({ navigation }) {

  // test users login info:
  // email: user@example.com
  // pw: secretPassword
  const [email, setEmail] = React.useState("user@example.com");
  const [password, setPassword] = React.useState("secretPassword");
  // you can find this function in Navigation.js
  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <Input
        containerStyle={styles.paddingTopHundred}
        lable="E-mail"
        placeholder="E-mail"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <Input
        lable="Password"
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <Button
        buttonStyle={[styles.backgroundTheme, {marginBottom: 20}]}
        onPress={() => signIn(email, password)}
        title="Login"
        containerStyle={styles.paddingHorizontalTen} />
      <Button
        buttonStyle={styles.backgroundTheme}
        onPress={() => navigation.navigate("Register")}
        title="Register"
        containerStyle={styles.paddingHorizontalTen}
      />
    </View>
  );
}
