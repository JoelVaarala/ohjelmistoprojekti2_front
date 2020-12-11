import React, { useState } from 'react';
import { Alert, ScrollView, SafeAreaView, Text, View, TextInput, FlatList } from 'react-native';
import { ButtonGroup, ThemeProvider, Button } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import firebase from 'firebase';
import { store } from "../redux/index";
import styles from '../styles';
import { AuthContext } from './AuthContext';
import { useFocusEffect } from '@react-navigation/native'

export default function Settings() {

  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const { signOut } = React.useContext(AuthContext);
  const [shouldShow, setShouldShow] = useState(false);

  let userID = store.getState().UserDataReducer[0].id;
  let userToken = store.getState().UserDataReducer[0].token;

  // Add tags to array state
  const addTag = () => {
    setTagList([...tagList, tag]);
    setTag('');
    setShouldShow(!shouldShow);
  };

  // Delete tag by index
  const deleteItemById = (index) => {
    Alert.alert('Delete a tag', 'Are you sure you want to delete?', [
      { text: 'Cancel', onPress: () => console.log('User cancelled'), style: 'cancel' },
      { text: 'OK', onPress: () => setTagList(tagList.filter((itemi, indexi) => indexi !== index)) }
    ]);
  };

  // Sliders
  const [lowAge, setLowAge] = useState(14);
  const [highAge, setHighAge] = useState(100);
  const [distance, setDistance] = useState(1);
  const [time, setTime] = useState(1);

  // Buttongroup
  const buttons = ['Men', 'Women', 'Other'];
  const [selectedIndex, setSelectedIndex] = React.useState({ main: [0] });
  const [showHoursOrDays, setShowHoursOrDays] = useState(false);

  function updateIndex(name, value) {
    setSelectedIndex({ ...selectedIndex, [name]: value });
  }

  React.useEffect(() => {
    getData();
  }, []);

  // Saving data when screen goes out of focus
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        saveData();
      }
    })
  )


  const getData = async () => {
    let ref = firebase
      .firestore()
      .collection('users')
      .doc(userID)
      .collection('filters')
      .doc('myFilters');
    const doc = await ref.get();
    if (!doc.exists) {
    } else {

      setTagList(doc.data().tags);
      setDistance(doc.data().distance);
      setLowAge(doc.data().minAge);
      setHighAge(doc.data().maxAge);

      let genders = doc.data().genders;
      let male = genders.indexOf('male') > -1;
      let female = genders.indexOf('female') > -1;
      let other = genders.indexOf('other') > -1;
      let values = [];
      if (male == true) {
        values.push(0);
      }
      if (female == true) {
        values.push(1);
      }
      if (other == true) {
        values.push(2);
      }
      setSelectedIndex({ ...selectedIndex, main: values });
    }
  };

  // Post users settings
  function saveData() {

    let timelimit;
    if (showHoursOrDays == false) {
      // converting days to hours
      timelimit = time * 24;
    } else timelimit = time;

    let genders = [];
    if (selectedIndex.main.includes(0)) {
      genders.push('male');
    }
    if (selectedIndex.main.includes(1)) {
      genders.push('female');
    }
    if (selectedIndex.main.includes(2)) {
      genders.push('other');
    }

    let body = {
      idToken: userToken,
      uid: userID,
      data: {
        minAge: lowAge,
        maxAge: highAge,
        lookingFor: ['events', 'users'],
        genders: genders,
        distance: distance,
        eventsInXHours: timelimit,
        tags: tagList
      }
    };

    fetch(store.getState().DefaultReducer[0].url + 'filtersUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((err) => console.error(err));
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
                  style={[styles.tagTextInput, styles.marginTopTen]}
                ></TextInput>
              ) : (
                  <View style={styles.marginTopTen}>
                    <Button
                      buttonStyle={{ backgroundColor: buttonColor }}
                      titleStyle={{ color: buttonTitleColor }}
                      title="+"
                      onPress={() => setShouldShow(!shouldShow)}
                    />
                  </View>
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
              gravity={'center'}
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
              gravity={'center'}
              min={18}
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
              onPress={(value) => updateIndex('main', value)}
              selectMultiple={true}
              selectedIndexes={selectedIndex.main}
              buttons={buttons}
              containerStyle={[styles.background, styles.buttonGroupBorderColor]}
              innerBorderStyle={styles.buttonGroupInnerlineColor}
              textStyle={styles.title}
              selectedTextStyle={styles.buttonTitleColor}
            />
          </ThemeProvider>
        </View>
        <View style={styles.omatContainerit}>
          <Text style={styles.title}> Time limit:</Text>
          {showHoursOrDays ? (
            <View style={styles.paddingTopFifty}>
              <Button
                buttonStyle={{ backgroundColor: buttonColor }}
                titleStyle={{ color: buttonTitleColor }}
                title="Change to select days"
                onPress={() => setShowHoursOrDays(!showHoursOrDays)}
              />
              <RangeSlider
                style={styles.rangerSliderSize}
                gravity={'center'}
                rangeEnabled={false}
                min={1}
                max={23}
                step={1}
                selectionColor={rangerSliderColor}
                blankColor={rangerSliderColor}
                onValueChanged={(time, fromUser) => {
                  setTime(time);
                }}
              />
              <Text style={styles.title}> Time limit is {time} hours</Text>
            </View>
          ) : (
              <View style={styles.paddingTopFifty}>
                <Button
                  buttonStyle={{ backgroundColor: buttonColor }}
                  titleStyle={{ color: buttonTitleColor }}
                  title="Change to select hours"
                  onPress={() => setShowHoursOrDays(!showHoursOrDays)}
                />
                <RangeSlider
                  style={styles.rangerSliderSize}
                  gravity={'center'}
                  rangeEnabled={false}
                  min={1}
                  max={7}
                  step={1}
                  selectionColor={rangerSliderColor}
                  blankColor={rangerSliderColor}
                  onValueChanged={(time, fromUser) => {
                    setTime(time);
                  }}
                />
                <Text style={styles.title}>Time limit is {time} days </Text>
              </View>
            )}
        </View>
        <View style={styles.saveButton}>
          <Button
            buttonStyle={{ backgroundColor: buttonColor }}
            titleStyle={{ color: buttonTitleColor }}
            onPress={() => signOut()}
            title="Sign out"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
