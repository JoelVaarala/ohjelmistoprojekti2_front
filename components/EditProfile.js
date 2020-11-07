import React, { useState } from "react";
import { Alert, Button, FlatList, Text, View, TextInput } from "react-native";
import { Icon, Input } from "react-native-elements";
import firebase from "firebase";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
import styles from "../styles";

//Käyttäjän tagit, bio ja kuvat. Nimeä ja ikää ei voi vaihtaa
export default function EditProfile() {
  //tagit
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [userTiedot, setUserTiedot] = useState({
    age: 0,
    bio: "",
    name: "",
  });

  React.useEffect(() => {
    // console.log('useeffecti', tagList)
    HaeTiedot();
  }, []);

  function TallennaData() {
    let body = {
      data: {
        tags: tagList,
        bio: userTiedot.bio,
      },
      uid: global.myUserData.uid,
      idToken: global.myUserData.idToken,
    };

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
    Alert.alert("Tiedot tallennettiin");
  }

  // function HaeKayttajanTiedot_autoupdate() {
  //   let ref = firestore().collection("users").doc(auth().currentUser.uid)
  //   ref.onSnapshot((querySnapshot) => {
  //     let iäkäs = querySnapshot.data().age
  //     // console.log('user ika : ', iäkäs) // prints 23 tai new value
  //     setUserTiedot({
  //      age: (querySnapshot.data().age),
  //      bio: (querySnapshot.data().bio),
  //      name: (querySnapshot.data().displayName)
  //     })
  //     setTagList(querySnapshot.data().tags)
  //   })

  // }

  const HaeTiedot = async () => {
    const ref = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
    const doc = await ref.get();
    if (!doc.exists) {
      console.log("document not found");
    } else {
      console.log("success HERE HERE ::::", doc.data());
      setUserTiedot({
        age: doc.data().age,
        bio: doc.data().bio,
        name: doc.data().displayName,
      });
      setTagList(doc.data().tags);
    }
  };

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

  return (
    <View style={[styles.flexOne, styles.background]}>
      <View style={[styles.container, styles.containerCenter, styles.marginTopThirty]}>
        <View style={styles.flexDirectionRow}>
          <Text style={[styles.editProfileText, styles.myProfileUserText]}>
            {userTiedot.name}, {userTiedot.age}
          </Text>
        </View>
        <Icon reverse name="image" />
        <Text style={styles.title}>Add a picture</Text>
      </View>
      <View style={(styles.flexOne, styles.paddingTopFifty)}>
        <Text style={[styles.containerCenter, styles.title, styles]}>Bio :</Text>
        <View style={styles.editProfileBioTextArea}>
          <TextInput
            value={userTiedot.bio}
            style={styles.editProfileTextArea}
            multiline={true}
            numberOfLines={3}
            maxLength={500}
            onChangeText={(text) => setUserTiedot({ ...userTiedot, bio: text })}
          />
        </View>
      </View>
      {/* meillä ei oo asuinpaikkaa nyt */}
      {/* <Text style={styles.text}>Asuinpaikka: </Text>
      <View style={styles.textAreaContainer}> 
        <TextInput {styles.editProfileTextArea} placeholder='Asuinpaikka' />
      </View> */}
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
      <View style={styles.saveButton}>
        <Button color={buttonColor} onPress={TallennaData} title="Save" />
      </View>
    </View>
  );
}
