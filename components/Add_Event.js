import React, { useEffect, useState } from "react";
import { Text, View, TextInput, FlatList, ScrollView, Alert } from "react-native";
import { Button } from "react-native-elements";
import DatePicker from "react-native-date-picker";
import { connect } from "react-redux";
import { store, addEvent } from "../redux/index";
import styles from "../styles";
import { showMessage } from "react-native-flash-message";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

function Add_Events({ navigation, route }, props) {

  // States for event information
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();

  // State render conditionally between form and map -views
  const [view, setView] = useState(true);
  const [address, setAddress] = useState("loading location...");
  const [newAddress, setNewAddress] = useState("");

  //const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: global.myUserData.filters.myLocation.latitude,
    longitude: global.myUserData.filters.myLocation.longitude,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  useEffect(() => {
    getLocation();
  }, []);

  // Add tags to array state
  const addTag = () => {
    setTags([tag, ...tags]);
    setTag("");
  };

  const getLocation = async () => {
    //Checkpermission
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to accesslocation');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      });
      // fetch address using device's location coordinates
      fetchAddress(location.coords.latitude, location.coords.longitude);
    }

  };

  // Post new event
  const sendEvent = () => {
    let url = global.url + "event";

    let bodi = {
      idToken: global.myUserData.idToken, // HOX, this needs to be changed to actual current user instead of global
      uid: global.myUserData.uid,
      data: {
        eventType: "public",
        eventStart: date,
        eventEnd: "",
        displayName: eventName,
        bio: description,
        position: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
        tags: tags,
        images: [],
      },
    };

    // Here we can add validation cases, now incase this fails user will be prompted with orange flash message for invalid fields
    if (eventName.length > 2 && date != null && description != "") {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodi),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res, "POST success");
          showSuccess();
          navigation.navigate("Profile");
        })
        .catch((err) => {
          console.error(err, "POST failed");
          showFail();
        });
    } else {
      // Construct message of known issues and pass it as parameter for indicator message
      let message = ["Invalid fields : "]

      if (bodi.data.displayName == "")
        message.push(" Name ")
      if (bodi.data.bio == "")
        message.push(" Description ")
      if (bodi.data.eventStart == null)
        message.push(" Date ")

      showInvalid(message);
    }
  };


  // flash message for failed event creation
  const showFail = () => {
    showMessage({
      message: "Adding event failed",
      description: " try again :( ",
      type: "default",
      duration: 1850,
      backgroundColor: "red",
      color: "white",
      // you can also add onPress -function
    });
  };

  // flash message for invalid user input
  const showInvalid = (msg) => {
    showMessage({
      message: "Fail",
      description: msg,
      type: "default",
      duration: 1850,
      backgroundColor: "orange",
      color: "black",
    });
  };

  // flash message for successful event creation
  const showSuccess = () => {
    showMessage({
      message: "Event has been added successfully",
      description: "party time excellent",
      type: "default",
      duration: 1850,
      backgroundColor: "green",
      color: "white",
    });
  };

  // fetch address data based on coordinates
  const fetchAddress = (la, lo) => {
    let key = global.key;
    let long = lo;
    let lat = la;
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.results[0].locations[0].adminArea5 + ", " + data.results[0].locations[0].street);
        // value above is string version and below example for location object for more values
      });
  };

  // fetch coordinates for new location search
  const fetchCoordinates = () => {
    let key = global.key;
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${newAddress}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (newAddress.length > 3) {
          setAddress(newAddress);
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
    setNewAddress("");
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
            />

            <Text style={[styles.title, styles.marginTopTen]}>Event description : </Text>
            <TextInput 
              style={styles.addEventTextbox} 
              onChangeText={(text) => setDescription(text)} 
              value={description} 
            />
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

          <Text style={[styles.title, styles.marginTopTen]}>Event location :</Text>
          <Text style={[styles.title, styles.marginTopTen]}> - {address}</Text>
          <View style={styles.viewFirst}>

            <Button
              buttonStyle={{ backgroundColor: 'orange', alignSelf: 'center' }} titleStyle={{ color: 'black' }}
              onPress={() => {
                setView(false);
              }}
              title="Select another"
            />
          </View>

          <View style={[styles.container]}>
            <Text style={[styles.title, styles.marginTopTen]}>Event tags : </Text>
            <TextInput 
              style={styles.addEventTextbox} 
              onChangeText={(text) => setTag(text)} 
              value={tag} onEndEditing={addTag} 
            />
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
            <Button 
              buttonStyle={{ backgroundColor: 'orange', alignSelf: 'center' }} 
              titleStyle={{ color: 'black' }} 
              onPress={sendEvent} 
              title="Save event" 
            />
          </View>
        </View>
      )
        :
        (
          <View >
            <Text style={{ marginTop: 50 }}>current : {address}</Text>
            <MapView style={styles.mapView} region={region}>
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                title={address}
              />
            </MapView>
            <View style={{ marginTop: '100%' }}>
            </View>
            <View style={{ backgroundColor: 'black', marginTop: '10%' }}>
              <TextInput 
                style={styles.addEventTextbox}
                onChangeText={(text) => setNewAddress(text)}
                value={newAddress}
                onEndEditing={fetchCoordinates}
                placeholder={address}
                placeholderTextColor="grey"
              />
              <Text></Text>
              <Button 
                buttonStyle={{ backgroundColor: 'orange', width: '50%', alignSelf: 'center' }} 
                titleStyle={{ color: 'black' }} 
                title="confirm address" 
                onPress={() => setView(true)} 
              />
            </View>
          </View>)}
    </ScrollView>
  );
}

// hox! Reducer not currently being used 
const mapStateToProps = (state) => ({
  EventReducer: state.EventReducer,
});
// Component connects to reducer and receives params state, action and main function
const Add_Event = connect(mapStateToProps, { addEvent })(Add_Events);
// Export default const above instead of "main function"
export default Add_Event;
