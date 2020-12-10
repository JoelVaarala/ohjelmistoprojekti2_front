import React from "react";
import { Alert, View, ScrollView } from "react-native";
import { Input, Button, Text, ButtonGroup } from "react-native-elements";
import DatePicker from "react-native-date-picker";
import { Entypo } from "@expo/vector-icons";
import styles from "../styles";
import {AuthContext} from './AuthContext';

export default function Register() {

  const [userdata, setUserdata] = React.useState({ email: "", password: "", age: 1, displayName: "", gender: "male" });
  const [hidePassword, setHidePassword] = React.useState(true);
  const [passwordIcon, setPasswordIcon] = React.useState("eye");
  // this is the date shown in datepicker
  const [date, setDate] = React.useState(Date.now());
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // you can find this function in Navigation.js
  const { signIn } = React.useContext(AuthContext);
  // gender options for ButtonGorup
  const buttons = ["Man", "Woman", "Other"];

  // converts the datepickers date into unix age when new date is selected
  React.useEffect(() => {
    let unixAge = Math.floor(date / 1000);
    inputChanged("age", unixAge);
  }, [date]);

  // converts the index of ButtonGroup to gender value
  function genderConvert(name, value) {
    let gender;
    if (value === 0) {
      gender = "male";
    } else if (value === 1) {
      gender = "female";
    } else if (value === 2) {
      gender = "other";
    }
    setSelectedIndex(value);
    inputChanged(name, gender);
  }

  function inputChanged(inputName, inputValue) {
    setUserdata({ ...userdata, [inputName]: inputValue });
  }

  // this function hides/shows the password and changes the icon
  function changePasswordVisibility() {
    if (hidePassword) {
      setHidePassword(false);
      setPasswordIcon("eye-with-line");
    } else {
      setHidePassword(true);
      setPasswordIcon("eye");
    }
  }

  // returns correct icon for password field
  function icon() {
    return <Entypo name={passwordIcon} size={30} onPress={() => changePasswordVisibility()} />;
  }

  // send userdata to backend, where new user is registered. attempts to signin afterwards
  function registerUser() {
    let valid = validation();
    if (!valid) {
      return;
    }

    let url = global.url + "register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.result === 'rekisteörinti onnistui') {
          signIn(userdata.email, userdata.password);
        } else if (res.result === 'rekisteörinti epäonnistui:Error: The email address is improperly formatted.'){
          Alert.alert('Email address is improperly formatted');
        } else if (res.result === 'rekisteörinti epäonnistui:Error: The email address is already in use by another account.') {
          Alert.alert('Email address is already in use');
        } else {
          console.log(res.result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // checks if password, age and name are valid
  function validation() {
    let minAge = new Date();
    minAge = minAge.setFullYear(minAge.getFullYear() - 18);
    minAge = Math.floor(minAge / 1000);
    if (userdata.password.length < 6) {
      Alert.alert('Password must be atleast 6 characters long');
      return false;
    } else if (userdata.age > minAge) {
      Alert.alert('You are under 18');
      return false;
    } else if (userdata.displayName === '') {
      Alert.alert('Name is missing')
      return false;
    }
    return true;
  }

  return (
    <ScrollView style={(styles.flexOne, styles.paddingTop)}>
      <Text style={[styles.alignSelfCenter, styles.registerUserTitle]}>Register user</Text>
      <Input
        label="Email"
        placeholder="matti.matikainen@gmail.com"
        onChangeText={(value) => inputChanged("email", value)}
        value={userdata.email}
      />
      <Input
        label="Password"
        placeholder="Must have atleast 6 characters"
        secureTextEntry={hidePassword}
        onChangeText={(value) => inputChanged("password", value)}
        value={userdata.password}
        rightIcon={icon}
      />
      <Input
        label="Name"
        placeholder="Matti Matikainen"
        onChangeText={(value) => inputChanged("displayName", value)}
        value={userdata.displayName}
      />

      <View style={styles.marginLeftTen}>
        <Text 
          style={styles.registerUserText}
        >
          Birthdate
        </Text>

        <DatePicker style={styles.alignSelfCenter} date={date} onDateChange={(value) => setDate(value)} mode="date" locale="fi" />
      </View>

      <View style={[styles.marginLeftTen, styles.paddingTopTen]}>
        <Text 
          style={styles.registerUserText}
        >
          Gender
        </Text>

        <ButtonGroup
          onPress={(value) => genderConvert("gender", value)}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={styles.heightForty}
        />

      </View>
      <Button onPress={() => registerUser()} title="Register" containerStyle={styles.registerUserButton} />
    </ScrollView>
  );
}
