import React from "react";
import { View, ScrollView } from "react-native";
import { Input, Button, Text, ButtonGroup } from "react-native-elements";
import DatePicker from "react-native-date-picker";
import { Entypo } from "@expo/vector-icons";
import styles from "../styles";
import {AuthContext} from './AuthContext';

export default function Register({ navigation }) {
  const [kayttajaTiedot, setKayttajaTiedot] = React.useState({ email: "", password: "", age: 1, displayName: "", gender: "male" });
  const [naytasalasana, setNaytaSalasana] = React.useState(true);
  const [salasanaIcon, setSalasanaIcon] = React.useState("eye");
  const [date, setDate] = React.useState(Date.now());
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { signIn } = React.useContext(AuthContext);

  //sukupuolen ButtonGorup valinnat
  const buttons = ["Man", "Woman", "Other"];

  //tällä muutetaan valitun syntymäajan päivämäärä unix ajaksi
  React.useEffect(() => {
    let unixIka = Math.floor(date / 1000);
    inputChanged("age", unixIka);
  }, [date]);

  // muutetaan ButtonGroupisa palautuneen valinnan indexi tallennettavaksi sukupuoleksi ja focusataan valittu buttoni
  function genderConvert(name, value) {
    let gender;
    if (value === 0) {
      gender = "male";
    } else if (value === 1) {
      gender = "female";
    } else if (value === 2) {
      gender = "other";
    }
    console.log(gender);
    setSelectedIndex(value);
    inputChanged(name, gender);
  }

  function inputChanged(inputName, inputValue) {
    setKayttajaTiedot({ ...kayttajaTiedot, [inputName]: inputValue });
  }

  //funkkari näyttämään/piilottamaan salasana inputkentässä
  function naytasalasanaVaihto() {
    if (naytasalasana) {
      setNaytaSalasana(false);
      setSalasanaIcon("eye-with-line");
    } else {
      setNaytaSalasana(true);
      setSalasanaIcon("eye");
    }
  }

  //salasanainputin iconi
  function iconi() {
    return <Entypo name={salasanaIcon} size={30} onPress={() => naytasalasanaVaihto()} />;
  }

  //lähetetään rekisteröinti tiedot backiin, joka luo uuden käyttäjän ja tälle tarvittavat documentit yms.
  function registerUser() {
    let url = global.url + "register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kayttajaTiedot),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.result);
      })
      .then((_) => {
        // navigation.goBack();
        signIn(kayttajaTiedot.email, kayttajaTiedot.password);
      })
      .catch((err) => console.error(err));
  }

  //TODO
  //labelStyle inputeissa ja itsetehdyt Text "lablet" samalla tyylillä tulevaisuudessa jostain StyleSheatista
  //muuta css hömpötystä
  //salasanalle checki, onko vähintään 6 merkkiä
  //sähköpostile checki, onko legit syntaxi
  //checki, onnistuiko rekisteröinti, jos onnistui -> loginpage ja kirjaudu automaattisesti
  return (
    <ScrollView style={(styles.flexOne, styles.paddingTop)}>
      <Text style={[styles.alignSelfCenter, styles.registerUserTitle]}>Register user</Text>
      <Input
        label="Email"
        placeholder="matti.matikainen@gmail.com"
        onChangeText={(value) => inputChanged("email", value)}
        value={kayttajaTiedot.email}
      />
      <Input
        label="Password"
        placeholder="Must have atleast 6 characters"
        secureTextEntry={naytasalasana}
        onChangeText={(value) => inputChanged("password", value)}
        value={kayttajaTiedot.password}
        rightIcon={iconi}
      />
      <Input
        label="Name"
        placeholder="Matti Matikainen"
        onChangeText={(value) => inputChanged("displayName", value)}
        value={kayttajaTiedot.displayName}
      />

      <View style={styles.marginLeftTen}>
        <Text //jos on joku parempi label systeemi, saa muuttaa tämän
          style={styles.registerUserText}
        >
          Birthdate
        </Text>

        <DatePicker style={styles.alignSelfCenter} date={date} onDateChange={(value) => setDate(value)} mode="date" locale="fi" />
      </View>

      <View style={[styles.marginLeftTen, styles.paddingTopTen]}>
        <Text //jos on joku parempi label systeemi, saa muuttaa tämän
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

        {/* <RadioGroup // muuta setWidthHeight 'useNativeDriver: true' falseksi node moduulissa react-native-radio-button-group/lib/Circle.js, muuten tulee errori: Style property 'height' is not supported by native animated module
                    horizontal
                    options={genderOptions}
                    onChange={(value) => inputChanged('gender', value.id)}
                // circleStyle={ styles.registerRadioGroup // tällä voi muutella radiopylpyrän tyyliä }
                /> */}
      </View>
      <Button onPress={() => registerUser()} title="Register user" containerStyle={styles.registerUserButton} />
    </ScrollView>
  );
}
