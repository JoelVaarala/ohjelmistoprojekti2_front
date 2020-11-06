import React, { useState } from "react";
import { Alert, ScrollView, SafeAreaView, Platform, Text, View, TextInput, Button, FlatList, StatusBar } from "react-native";
import { Input, Slider, ButtonGroup, ThemeProvider } from "react-native-elements";
import RangeSlider from "rn-range-slider";
import CheckBox from "@react-native-community/checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
import styles from "../styles";
import { AuthContext } from "./AuthContext";

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Settings() {
  //tagit
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const { signOut } = React.useContext(AuthContext);
  const [shouldShow, setShouldShow] = useState(false);

  const addTag = () => {
    setTagList([...tagList, tag]);
    setTag("");
    setShouldShow(!shouldShow);
  };

  const deleteItemById = (index) => {
    Alert.alert("Poista tagi", "Haluatko varmasti poistaa tagin?", [
      { text: "Peruuta", onPress: () => console.log("Käyttäjä peruutti"), style: "cancel" },
      { text: "OK", onPress: () => setTagList(tagList.filter((itemi, indexi) => indexi !== index)) },
    ]);
  };

  //sliderit
  const [lowAge, setLowAge] = useState(14);
  const [highAge, setHighAge] = useState(100);
  const [distance, setDistance] = useState(1);
  //checkboxit
  const [female, setFemale] = useState(false);
  const [male, setMale] = useState(false);
  const [other, setOther] = useState(false);
  const [events, setEvents] = useState(false);
  const [people, setPeople] = useState(false);

  //buttongroup
  const buttons = ["Men", "Women", "Other"];
  const [selectedIndex, setSelectedIndex] = React.useState({ main: [0] });

  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value });
  }

  console.log(selectedIndex);
  //datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const formatDate = (date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };
  React.useEffect(() => {
    HaeTiedot();
  }, []);

  const HaeTiedot = async () => {
    let ref = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("filters").doc("myFilters");
    const doc = await ref.get();
    if (!doc.exists) {
      console.log("document not found");
    } else {
      console.log("success HERE HERE ::::", doc.data());

      setTagList(doc.data().tags);
      setDistance(doc.data().distance);
      setLowAge(doc.data().minAge);
      setHighAge(doc.data().maxAge);

      {
        /*
      let looking = doc.data().lookingFor;
      let events = looking.indexOf("events") > -1;
      let people = looking.indexOf("users") > -1;
      if (events == true) {
        setEvents(true);
      }
      if (people == true) {
        setPeople(true);
      }
    */
      }
      let genders = doc.data().genders;
      let male = genders.indexOf("male") > -1;
      let female = genders.indexOf("female") > -1;
      let other = genders.indexOf("other") > -1;
      let values = [];
      if (male == true) {
        // setMale(true);
        values.push(0);
      }
      if (female == true) {
        values.push(1);
        // setFemale(true);
      }
      if (other == true) {
        values.push(2);
        //   setOther(true);
      }
      console.log(values);
      setSelectedIndex({ ...selectedIndex, main: values });
    }
  };

  function TallennaData() {
    let genders = [];
    if (selectedIndex.main.includes(0)) {
      //   setGenders(["male"])
      genders.push("male");
    }
    if (selectedIndex.main.includes(1)) {
      //    setGenders([...genders, "female"])
      genders.push("female");
    }
    if (selectedIndex.main.includes(2)) {
      //  setGenders([...genders, "other"])
      genders.push("other");
    }
    console.log(genders);

    let body = {
      idToken: global.myUserData.idToken,
      uid: global.myUserData.uid,
      data: {
        minAge: lowAge,
        maxAge: highAge,
        lookingFor: ["events", "users"],
        genders: genders,
        distance: distance,
        eventsInXHours: 7,
        tags: tagList,
      },
    };

    console.log(body);
    fetch(global.url + "filtersUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
      })
      .catch((err) => console.error(err));
    Alert.alert("Tiedot tallennettiin");
  }
  function HaeSettingsValues() {
    let ref = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
    ref.onSnapshot((querySnapshot) => {
      let sukupuutto = querySnapshot.data().gender;
      console.log(sukupuutto);
      // setStates here as shown above
    });
  }
  {
    /*
  function TallennaData() {
    let body = {
      data: {
        data: {
          minAge: lowAge,
          maxAge: highAge,
          lookingFor: ["events", "users"],
          genders: ["rakkautta", "rauhaa"],
          distance: distance,
          eventsInXHours: 7,
          tags: tagList,
        },
      },
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
    };
    console.log(JSON.stringify(body));
    return;
    fetch(global.url + "profileUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
      })
      .catch((err) => console.error(err));
  } 
*/
  }

  return (
    <SafeAreaView style={[styles.flexOne, styles.background]}>
      <ScrollView>
        <View style={styles.omatContainerit}>
          <View>
            <Text style={styles.title}>Your tags :</Text>
            <View>
              {shouldShow ? (
                <TextInput
                  placeholder="Add a tag"
                  onChangeText={(tag) => setTag(tag)}
                  value={tag}
                  onEndEditing={addTag}
                  style={styles.tagTextInput}
                ></TextInput>
              ) : (
                <Button color={buttonColor} title="+" onPress={() => setShouldShow(!shouldShow)} />
              )}
            </View>
          </View>
          <View style={styles.flexOne}>
            <FlatList
              contentContainerStyle={[styles.paddingTopTen, styles.paddingRightTwenty]}
              horizontal={false}
              numColumns={3}
              data={tagList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Text onPress={() => deleteItemById(index)} style={styles.tagBox}>
                  {item}
                </Text>
              )}
            />
          </View>
        </View>
        <View style={styles.omatContainerit}>
          <View>
            <Text style={styles.title}>Distance:</Text>
            <RangeSlider
              style={styles.rangerSliderSize}
              gravity={"center"}
              rangeEnabled={false}
              min={1}
              max={100}
              step={1}
              selectionColor={rangerSliderColor}
              blankColor={rangerSliderColor}
              onValueChanged={(distance, fromUser) => {
                setDistance(distance);
              }}
            />
          </View>
          <Text style={styles.title}> {distance} km</Text>
          <View style={styles.paddingTopFifty}>
            <Text style={styles.title}> Ages:</Text>
            <RangeSlider
              style={styles.rangerSliderSize}
              gravity={"center"}
              min={14}
              max={100}
              step={1}
              valueType="number"
              rangeLow={lowAge}
              rangeHigh={highAge}
              selectionColor={rangerSliderColor}
              blankColor={rangerSliderColor}
              onValueChanged={(lowAge, highAge, fromUser) => {
                setLowAge(lowAge), setHighAge(highAge);
              }}
            />
            <Text style={styles.title}>
              {lowAge} - {highAge} ages
            </Text>
          </View>
        </View>

        <Text style={styles.title}>Gender:</Text>
        <View>
          <ThemeProvider theme={swipesPageButtonGroupColor}>
            <ButtonGroup
              onPress={(value) => updateIndex("main", value)}
              selectMultiple={true}
              selectedIndexes={selectedIndex.main}
              buttons={buttons}
              containerStyle={[styles.background, styles.heightForty]}
            />
          </ThemeProvider>
        </View>
        {/* <Text style={styles.checkboxText}>Men</Text>
            <CheckBox tintColors={checkBoxColor()} disabled={false} value={male} onValueChange={(newValue) => setMale(newValue)} />
          </View>
          <View>
            <Text style={styles.checkboxText}>Women</Text>
            <CheckBox tintColors={checkBoxColor()} disabled={false} value={female} onValueChange={(newValue) => setFemale(newValue)} />
          </View>
          <View>
            <Text style={styles.checkboxText}>Other</Text>
        <CheckBox tintColors={checkBoxColor()} disabled={false} value={other} onValueChange={(newValue) => setOther(newValue)} /> */}

        <View style={styles.omatContainerit}>
          {/* FIXME Tähän tulee aikaslideri josta valitaan tuntien tai päivien päästä */}
          {/* <View>
            <Text>Tästä päivästä päivään {formatDate(date)} </Text>
            <Button onPress={showDatepicker} title="Valitse haettavat päivät" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )} */}
        </View>
        <View style={styles.saveButton}>
          <Button color={buttonColor} onPress={TallennaData} title="Save" />
        </View>
        <View style={styles.saveButton}>
          <Button color={signOutButton} onPress={() => signOut()} title="Sign out" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
