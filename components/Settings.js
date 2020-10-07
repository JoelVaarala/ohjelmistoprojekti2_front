import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Platform, Text, View, TextInput, Button, FlatList, StatusBar } from 'react-native';
import { Input, Slider } from 'react-native-elements'
import RangeSlider from 'rn-range-slider';
import CheckBox from '@react-native-community/checkbox';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function Settings() {

  //tagit
  const [tag, setTag] = useState('')
  const [tagList, setTagList] = useState([])

  const addButtonPressed = () => {
    setTagList([...tagList, { key: tag }])
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.omatContainerit}>
          <View style={{ backgroundColor: 'white' }} >
            <Text>Lisää tägi</Text>
            <TextInput onChangeText={tag => setTag(tag)} value={tag} style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white' }}></TextInput>
            <Button style={styles.button} onPress={addButtonPressed} title="LISÄÄ"></Button>
          </View>
          <View>
            <Text>Olet valinnut seuraavat tagit:</Text>
            <FlatList contentContainerStyle={styles.content}
              horizontal={false}
              numColumns={3}
              data={tagList}
              renderItem={({ item }) =>
                <Text style={styles.tag}>{item.key}</Text>}
            />
          </View>
        </View>
        <View style={styles.omatContainerit}>
          <Text>Enimmäisetäisyys: {distance} kilometriä</Text>
          <View>
            <RangeSlider
              style={{ width: 160, height: 60 }}
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
          <View style={{ paddingTop: 10 }}>
            <Text>Ikäryhmä: {lowAge} - {highAge} vuotiaat</Text>
            <RangeSlider
              style={{ width: 160, height: 60 }}
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
          </View>
        </View>


        <View style={styles.omatContainerit}>
          <Text>Sukupuoli</Text>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={female}
              onValueChange={(newValue) => setFemale(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Naiset</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={male}
              onValueChange={(newValue) => setMale(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Miehet</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={other}
              onValueChange={(newValue) => setOther(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Muut</Text>
          </View>
        </View>
        <View style={styles.omatContainerit}>
          <Text>Hakukohteena </Text>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={events}
              onValueChange={(newValue) => setEvents(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Tapahtumat</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              disabled={false}
              value={people}
              onValueChange={(newValue) => setPeople(newValue)}
            />
            <Text style={{ marginTop: 5 }}>Ihmiset</Text>
          </View>
        </View>

        <View style={styles.omatContainerit}>
          <View>
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
          )}
        </View>
        <View style={styles.omatContainerit}>
          <Button title='Tallenna muutokset' />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {

  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    justifyContent: 'flex-start',
  },
  tag: {
    padding: 6,
    fontSize: 16,
    color: 'white',
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 6,
  },
  omatContainerit: {
    flex: 4,
    paddingTop: 20,
    alignItems: 'flex-start',
    paddingLeft: 80
  },
  content: {
    paddingTop: 10,
  },
  checkbox: {
    flexDirection: 'row'
  },
});
