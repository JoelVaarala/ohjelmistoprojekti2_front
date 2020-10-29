import React, { useEffect, useState, Component } from "react";
import { Text, View, TextInput, Button, FlatList, ScrollView, Alert, Modal, TouchableHighlight } from "react-native";
import { Icon, Input } from "react-native-elements";
import DatePicker from "react-native-date-picker";
import Redux from "redux";
import auth from "@react-native-firebase/auth";
import { connect } from "react-redux";
import { store, addEvent } from "../redux/index";
import styles from "../styles";
import { showMessage } from "react-native-flash-message";
import MapView, { Marker } from "react-native-maps";

function Add_Eventti({ navigation, route }, props) {
  // Statet tapahtuman tiedoille
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();
  // State renderöi "kyselyn"(default) tai "preview" (ln:88)
  const [view, setView] = React.useState(true);

  const [value, setValue] = React.useState("sijainti");
  const [newValue, setNewValue] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = React.useState({
    latitude: global.myUserData.filters.myLocation.latitude,
    longitude: global.myUserData.filters.myLocation.longitude,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [place, setPlace] = React.useState({
    street: "",
    city: "",
    postalcode: "",
  });

  React.useEffect(() => {
    fetchAddress();
  }, []);

  // Lisätään tägit taulukkoon
  const addTag = () => {
    setTags([tag, ...tags]);
    setTag("");
  };

  // Lähetetään reducerin kautta storeen eventin tiedot ja nollataan statet
  // Lopuksi myös vaihdetaan view -> false, jolloin preview screen aktivoituu
  const goToPreview = () => {
    // store.dispatch(addName(eventName))
    //tags.forEach(el =>console.log(el))
    store.dispatch(addEvent({ eventName, description, date, location, tags }));
    // console.log('tässä store : ', store.getState())
    // console.log(Array.isArray(store.getState().EventReducer[0].tags))
    setEventName("");
    setDescription("");
    setDate(new Date());
    setTags([]);
    setView(false);
  };

  // Luodun eventin lähetys
  // TODO : paikkatiedot korjaus, mahd valinta public
  const sendEvent = () => {
    let start_s = store.getState().EventReducer[0].date;
    let event_s = store.getState().EventReducer[0].eventName;
    let bio_s = store.getState().EventReducer[0].description;
    let tagit_s = store.getState().EventReducer[0].tags;
    let url = global.url + "event";
    // console.log('Tagi array', store.getState().EventReducer[0].tags)
    // console.log(startTime, "start")
    // console.log(displayName, " dp name")
    // console.log(bio, " tää on bio")
    // console.log(auth().currentUser.uid, ' current user')
    // console.log(tagit, ' tagit')

    let bodi = {
      idToken: global.myUserData.idToken,
      uid: global.myUserData.uid,
      data: {
        eventType: "public",
        eventStart: start_s,
        eventEnd: "",
        displayName: event_s,
        bio: bio_s,
        position: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
        tags: tagit_s,
        images: [],
      },
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodi),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res, "LÄHETYS ONNISTUI");
        showSuccess();
        navigation.navigate("Profile");
      })
      .catch((err) => {
        console.error(err, "LÄHETYS EPÄONNISTUI");
        showFail();
      });
  };

  // flash message for failed event creation
  const showFail = () => {
    showMessage({
      message: "Eventin lisäys epäonnistui",
      description: "better luck next time",
      type: "default",
      duration: 1850,
      backgroundColor: "red",
      color: "white",
      // you can also add onPRess -function
    });
  };

  // flash message for successful event creation
  const showSuccess = () => {
    showMessage({
      message: "Eventin lisäys onnistui",
      description: "wp gg",
      type: "default",
      duration: 1850,
      backgroundColor: "green",
      color: "white",
      // you can also add onPRess -function
    });
  };

  const fetchAddress = () => {
    let key = global.key;
    let long = region.longitude;
    let lat = region.latitude;

    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setValue(data.results[0].locations[0].adminArea5 + ", " + data.results[0].locations[0].street);
        setPlace({
          street: data.results[0].locations[0].street,
          city: data.results[0].locations[0].adminArea5,
          postalcode: data.results[0].locations[0].postalcode,
        });
      });
  };

  const fetchCoordinates = () => {
    let key = global.key;
    // api url here (add key and location)
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${newValue}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (newValue.length > 3) {
          setValue(newValue);
          setRegion({
            latitude: data.results[0].locations[0].latLng.lat,
            longitude: data.results[0].locations[0].latLng.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          });
        }
      })
      .catch((error) => {
        Alert.alert(error);
      });
    setNewValue("");
  };

  return (
    <ScrollView style={[styles.flexOne, styles.background]}>
      {view ? (
        <View style={[styles.marginLeftRightTen, styles.background]}>
          <View>
            <Text style={[styles.title, styles.MarginTopTwenty]}>Event name : </Text>
            <TextInput
              style={styles.addEventTextbox}
              onChangeText={(text) => setEventName(text)}
              value={eventName}
              //onEndEditing={() => store.dispatch(addName(eventName))}
              //_tällä lähetteisi eventName kun näppäimistö suljetaan
            />

            <Text style={[styles.title, styles.marginTopTen]}>Event description : </Text>
            <TextInput style={styles.addEventTextbox} onChangeText={(text) => setDescription(text)} value={description} />
          </View>

          <View>
            <Text style={[styles.title, styles.marginTopTen]}>Starting time : </Text>
            <DatePicker
              style={[styles.alignSelfCenter, styles.addEventDatePickerBackground]}
              date={date}
              onDateChange={(value) => setDate(value)}
              mode="datetime"
              locale="fi"
            />
          </View>

          <Text style={[styles.title, styles.marginTopTen]}>Event location : {value}</Text>

          <View style={styles.viewFirst}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.viewSecond}>
                <View style={styles.viewThird}>
                  <MapView style={styles.mapView} region={region}>
                    <Marker
                      coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                      }}
                      title={value}
                    />
                  </MapView>

                  <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                    <TouchableHighlight
                      style={styles.touchableHigh}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>SAVE</Text>
                    </TouchableHighlight>
                    <TextInput
                      style={styles.modalTextinput}
                      onChangeText={(text) => setNewValue(text)}
                      value={newValue}
                      onEndEditing={fetchCoordinates}
                      placeholder="Street 12, city"
                    />
                  </View>
                </View>
              </View>
            </Modal>
            <Button
              onPress={() => {
                setModalVisible(true);
              }}
              title="OPEN MAP"
            />
          </View>

          <View style={[styles.container]}>
            <Text style={[styles.title, styles.marginTopTen]}>Event tags : </Text>
            <TextInput style={styles.addEventTextbox} onChangeText={(text) => setTag(text)} value={tag} onEndEditing={addTag} />
            <View style={[styles.container, styles.marginLeftTwenty]}>
              <Text style={[styles.title, styles.marginTopTen]}>Tag List</Text>
              <FlatList
                horizontal={false}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                data={tags}
                renderItem={({ item }) => <Text style={styles.tagBox}>{item}</Text>}
              />
            </View>
          </View>

          <View style={styles.previewButtonStyle}>
            {/* <Button onPress={() => {
              showMessage({
                message: "TESTIMESSAGE",
                description: "TESTI ONNISTUI HYVIN",
                type: "default",
                duration: 1850,
                backgroundColor: "purple",
                color: "yellow" 
                // you can also add onPRess -function
              });
            }}
            title="testimessage"
            color="#841584"
            /> */}
            <Button onPress={goToPreview} title="preview" />
          </View>
        </View>
      ) : (
        <View style={styles.marginLeftTen}>
          <Text style={[styles.title, styles.marginTopTen]}>Your event review :</Text>
          <View style={styles.marginTopTen}>
            <Text style={[styles.title, styles.marginTopTen]}>Name : {store.getState().EventReducer[0].eventName}</Text>
            <Text style={[styles.title, styles.marginTopTen]}>Description : {store.getState().EventReducer[0].description}</Text>
            <Text style={[styles.title, styles.marginTopTen]}>Starting date : {store.getState().EventReducer[0].date.toString()}</Text>
            <Text style={[styles.title, styles.marginTopTen]}>Event location : {store.getState().EventReducer[0].location}</Text>
            <Text style={[styles.title, styles.marginTopTen]}>Tags : </Text>
            <View>
              {store.getState().EventReducer[0].tags.map((item) => {
                return (
                  <Text style={styles.addEventPreviewText} key={item.toString()}>
                    {item}
                  </Text>
                );
              })}
              
            </View>

            <Button onPress={sendEvent} title="Confirm event" />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  EventReducer: state.EventReducer,
});
// Komponentti yhdistetään reducerin saataville ja annetaan parametreiksi state, action ja main func
const Add_Event = connect(mapStateToProps, { addEvent })(Add_Eventti);
// Export ln:177
export default Add_Event;
