import React, { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList, Text, View, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { store } from "../redux/index";
import SortableList2 from './SortableList';
import styles from '../styles';
import { useFocusEffect } from '@react-navigation/native'

export default function EditProfile() {
  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [pics, setPics] = React.useState([]);
  const [user, setUser] = useState({
    age: 0,
    bio: '',
    name: ''
  });

  let userID = store.getState().UserDataReducer[0].id;
  let userToken = store.getState().UserDataReducer[0].token;

  // Saving changes in images in SortableList
  const callback = (childData) => {
    let images = childData
    setPics(images)
  }

  useEffect(() => {
    getData();
  }, []);

  // Saving data when screen goes out of focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        saveData();
      }
    })
  )

  // Post users information
  function saveData() {
    let body = {
      idToken: userToken,
      uid: userID,
      data: {
        bio: user.bio,
        tags: tagList,
        images: pics,
      },
    };
    fetch(store.getState().DefaultReducer[0].url + 'profileUpdate', {
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

  const getData = async () => {
    const ref = firebase.firestore().collection('users').doc(userID);
    const doc = await ref.get();
    if (!doc.exists) {
    } else {
      setPics(doc.data().images);
      setUser({
        age: doc.data().age,
        bio: doc.data().bio,
        name: doc.data().displayName
      });
      setTagList(doc.data().tags);
    }
  };

  function CreateSortableList() {
    return <SortableList2 images={pics} order={Object.keys(pics)} parentCallback={callback} />;
  }

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

  return (
    <ScrollView style={[styles.flexOne, styles.background]}>
      <View>
        <View style={[styles.container, styles.containerCenter, styles.marginTopThirty]}>
          <Text style={[styles.editProfileText, styles.myProfileUserText]}>
            {user.name}, {user.age}
          </Text>
        </View>
        <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center', flex: 4 }}>
          <CreateSortableList />
        </View>
        <View style={styles.flexOne}>
          <Text style={[styles.containerCenter, styles.title, styles]}>Bio :</Text>
          <View style={styles.editProfileBioTextArea}>
            <TextInput
              defaultValue={user.bio}
              style={styles.editProfileTextArea}
              multiline={true}
              numberOfLines={3}
              blurOnSubmit={true}
              maxLength={500}
              onEndEditing={(e) => {
                setUser({ ...user, bio: e.nativeEvent.text })
              }}
            />
          </View>
        </View>
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
                  <Button
                    buttonStyle={{ backgroundColor: buttonColor }}
                    titleStyle={{ color: buttonTitleColor }}
                    color={buttonColor}
                    title="+"
                    onPress={() => setShouldShow(!shouldShow)}
                  />
                )}
            </View>
          </View>
          <View>
            <View style={[styles.flexOne, styles.marginLeftTwenty]}>
              <FlatList
                contentContainerStyle={styles.paddingTopTen}
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
        </View>
      </View>
    </ScrollView>
  );
}
