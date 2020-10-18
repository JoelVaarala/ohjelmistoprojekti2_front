import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Platform, Text, View, TextInput, Button, FlatList, StatusBar } from 'react-native';
import { Input, Slider } from 'react-native-elements'
import RangeSlider from 'rn-range-slider';
import CheckBox from '@react-native-community/checkbox';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Settings() {

  //tagit
  const [tag, setTag] = useState('')
  const [tagList, setTagList] = useState([])

  const addTag = () => {
    setTagList([...tagList, tag])
    setTag('');
  }

  //sliderit
  const [lowAge, setLowAge] = useState(14)
  const [highAge, setHighAge] = useState(100)
  const [distance, setDistance] = useState(1)
  //checkboxit
  const [female, setFemale] = useState(false)
  const [male, setMale] = useState(false)
  const [other, setOther] = useState(false)
  const [events, setEvents] = useState(false)
  const [people, setPeople] = useState(false)

  //datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const formatDate = (date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }
  React.useEffect(() => {
    HaeTiedot();
  }, []);

  const HaeTiedot = async () => {
    let ref = firestore().collection("users").doc(auth().currentUser.uid).collection('filters').doc('myFilters')
    const doc = await ref.get();
    if (!doc.exists) {
      console.log('document not found')
    } else {
      console.log('success HERE HERE ::::', doc.data())

      setTagList(doc.data().tags)
      setDistance(doc.data().distance)
      setLowAge(doc.data().minAge)
      setHighAge(doc.data().maxAge)
      let looking = doc.data().lookingFor
      let events = (looking.indexOf("events") > -1);
      let people = (looking.indexOf("users") > -1);
      if (events == true) {
        setEvents(true)
      }
      if (people == true) {
        setPeople(true)
      }
      let genders = doc.data().genders
      let male = (genders.indexOf("male") > -1);
      let female = (genders.indexOf("female") > -1);
      let other = (genders.indexOf("other") > -1)
      if (male == true) {
        setMale(true)
      }
      if (female == true) {
        setFemale(true)
      }
      if (other == true) {
        setOther(true)
      }
    }
  }

  function TallennaData() {

    let body = {
      idToken: global.myUserData.idToken,
      uid: global.myUserData.uid,
      data: {
        minAge: minAge,
        maxAge: maxAge,
        lookingFOr: ["FIXME"],
        displayName: event_s,
        genders: ["FIXME"],
        distance: distance,
        eventsInXHours: 1,
        tags: []
      }
    }


    console.log(body)
    fetch(global.url + "filtersUpdate",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      })
      .catch(err => console.error(err))
  }
  function HaeSettingsValues() {
    let ref = firestore().collection("users").doc(auth().currentUser.uid)
    ref.onSnapshot((querySnapshot) => {
      let sukupuutto = querySnapshot.data().gender;
      console.log(sukupuutto);
      // setStates here as shown above
    })

  }

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
          tags: tagList
        }

      },
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
    }
    console.log(JSON.stringify(body))
    return;
    fetch(global.url + "profileUpdate",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      })
      .catch(err => console.error(err))

  }

  return (
    <SafeAreaView style={[styles.flexOne, styles.backgroundBlack]}>
      <ScrollView>
        <View style={styles.omatContainerit}>
          <View style={styles.backgroundBlack} >
            <Text style={styles.textOrangeBold}>Lisää tägi</Text>
            <TextInput onChangeText={tag => setTag(tag)} value={tag} onEndEditing={addTag}
              style={styles.addTagInputBox}>
            </TextInput>
          </View>
          <View>
            <Text style={styles.textOrangeBold}>Tags:</Text>
            <FlatList contentContainerStyle={styles.paddingTopTen}
              horizontal={false}
              numColumns={3}
              data={tagList}
              keyExtractor={((item, index) => index.toString())}
              renderItem={({ item }) =>
                <Text style={styles.tagBox}>{item}</Text>}
            />
          </View>
        </View>
        <View style={styles.omatContainerit}>
          <View>
            <Text style={styles.textOrangeBold}>Etäisyys:</Text>
            <RangeSlider
              style={styles.settingsRangerSlider}
              gravity={'center'}
              rangeEnabled={false}
              min={1}
              max={100}
              step={1}
              selectionColor="#3df"
              blankColor="#f618"
              onValueChanged={(distance, fromUser) => {
                setDistance(distance)
              }} />
          </View>
          <Text style={styles.textOrangeBold}> {distance} km</Text>
          <View style={styles.paddingTopFifty}>
            <Text style={styles.textOrangeBold}> Iät</Text>
            <RangeSlider
              style={styles.settingsRangerSlider}
              gravity={'center'}
              min={14}
              max={100}
              step={1}
              valueType='number'
              textsize={20}
              rangeLow={lowAge}
              rangeHigh={highAge}
              selectionColor="#3df"
              blankColor="#f618"
              onValueChanged={(lowAge, highAge, fromUser) => {
                setLowAge(lowAge), setHighAge(highAge)
              }} />
            <Text style={styles.textOrangeBold}> {lowAge} - {highAge} vuotiaat</Text>
          </View>
        </View>


        <View style={styles.omatContainerit}>
          <Text style={styles.textOrangeBold}>Sukupuoli</Text>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={female}
              onValueChange={(newValue) => setFemale(newValue)}
            />
            <Text style={styles.orangeMarginTopFive}>Naiset</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={male}
              onValueChange={(newValue) => setMale(newValue)}
            />
            <Text style={styles.orangeMarginTopFive}>Miehet</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={other}
              onValueChange={(newValue) => setOther(newValue)}
            />
            <Text style={styles.orangeMarginTopFive}>Muut</Text>
          </View>
        </View>
        <View style={styles.omatContainerit}>
          <Text style={styles.textOrangeBold}>Hakukohteena </Text>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={events}
              onValueChange={(newValue) => setEvents(newValue)}
            />
            <Text style={styles.orangeMarginTopFive}>Tapahtumat</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={people}
              onValueChange={(newValue) => setPeople(newValue)}
            />
            <Text style={styles.orangeMarginTopFive}>Ihmiset</Text>
          </View>
        </View>

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
          <Button
            onPress={TallennaData}
            title="Tallenna tiedot"
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
