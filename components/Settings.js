import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
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

  const [value, setValue] = React.useState(1)
  const [minAge, setMinAge] = React.useState('')
  const [maxAge, setMaxAge] = React.useState('')
  const [tag, setTag] = React.useState('')
  const [tagList, setTagList] = React.useState([])

  const addButtonPressed = () => {
    setTagList([...tagList, {key: tag}])
  }

  return (
    <SafeAreaView style={styles.settingsContainer}>
      <ScrollView>
        <View style={styles.settingsOmatContainerit}>
          <View style={styles.textInputBackground} >
            <Text>Lisää tägi</Text>
            <TextInput onChangeText={tag => setTag(tag)} value={tag} onEndEditing={addTag}
              style={styles.settingsAddTag}>
            </TextInput>
          </View>
          <View>
            <Text>Tags:</Text>
            <FlatList contentContainerStyle={styles.settingsContent}
              horizontal={false}
              numColumns={3}
              data={tagList}
              keyExtractor={((item, index) => index.toString())}
              renderItem={({ item }) =>
                <Text style={styles.settingsTag}>{item}</Text>}
            />
          </View>
        </View>
        <View style={styles.settingsOmatContainerit}>
          <View>
            <Text>Etäisyys:</Text>
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
          <Text> {distance} km</Text>
          <View style={styles.settingsAgePaddingTop}>
            <Text> Iät</Text>
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
            <Text> {lowAge} - {highAge} vuotiaat</Text>
          </View>
        </View>
        <Text>Ikäryhmä: {minAge} - vuotiaat</Text>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', padding: 20 }}>
          <Slider
            value={minAge}
            onValueChange={setMinAge}
            step={1}
            minimumValue={18}
            maximumValue={100}
            style={{ width: 200, height: 10 }}
            trackStyle={{ height: 10, backgroundColor: 'transparent' }}
          />
        </View>



        <View style={styles.settingsOmatContainerit}>
          <Text>Sukupuoli</Text>
          <View style={styles.settingsCheckbox}>
            <CheckBox
              disabled={false}
              value={female}
              onValueChange={(newValue) => setFemale(newValue)}
            />
            <Text style={styles.optionMarginTopFive}>Naiset</Text>
          </View>
          <View style={styles.settingsCheckbox}>
            <CheckBox
              disabled={false}
              value={male}
              onValueChange={(newValue) => setMale(newValue)}
            />
            <Text style={styles.optionMarginTopFive}>Miehet</Text>
          </View>
          <View style={styles.settingsCheckbox}>
            <CheckBox
              disabled={false}
              value={other}
              onValueChange={(newValue) => setOther(newValue)}
            />
            <Text style={styles.optionMarginTopFive}>Muut</Text>
          </View>
        </View>
        <View style={styles.settingsOmatContainerit}>
          <Text>Hakukohteena </Text>
          <View style={styles.settingsCheckbox}>
            <CheckBox
              disabled={false}
              value={events}
              onValueChange={(newValue) => setEvents(newValue)}
            />
            <Text style={styles.optionMarginTopFive}>Tapahtumat</Text>
          </View>
          <View style={styles.settingsCheckbox}>
            <CheckBox
              disabled={false}
              value={people}
              onValueChange={(newValue) => setPeople(newValue)}
            />
            <Text style={styles.optionMarginTopFive}>Ihmiset</Text>
          </View>
        </View>

        <View style={styles.settingsOmatContainerit}>

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
        <View style={styles.settingsOmatContainerit}>
          <Button
            onPress={TallennaData}
            title="Tallenna tiedot"
            style={styles.saveDataButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

