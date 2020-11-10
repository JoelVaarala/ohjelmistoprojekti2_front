import React, { useEffect, useState, Component } from "react";
import { Text, View, TextInput, FlatList, ScrollView, Alert, Modal, TouchableHighlight } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import DatePicker from "react-native-date-picker";
import Redux from "redux";
import { connect } from "react-redux";
import { store, addEvent } from "../redux/index";
import styles from "../styles";
import { showMessage } from "react-native-flash-message";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

function Add_Eventti({ navigation, route }, props) {
  // Statet tapahtuman tiedoille
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();
  
  // State renderöi "kyselyn"(default) tai "preview" (ln:88)
  const [view, setView] = React.useState(true);
  const [value, setValue] = React.useState("loading location...");
  const [newValue, setNewValue] = React.useState("");

  //const [modalVisible, setModalVisible] = useState(false);
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
    getLocation();
    //console.log(region)
  }, []);

  // Lisätään tägit taulukkoon
  const addTag = () => {
    setTags([tag, ...tags]);
    setTag("");
  };

  const getLocation= async()   => {
    //Checkpermission
    let   { status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('No permission to accesslocation');
    }
    else {
        let location= await Location.getCurrentPositionAsync({});
        // setLocation(location);
        // console.log(location.coords.latitude)
        
        setRegion({
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude, 
            latitudeDelta: 0.0322, 
            longitudeDelta: 0.0221
        });
        fetchAddress(location.coords.latitude, location.coords.longitude);
    }
   
};
  // Lähetetään reducerin kautta storeen eventin tiedot ja nollataan statet
  // Lopuksi myös vaihdetaan view -> false, jolloin preview screen aktivoituu
  // const goToPreview = () => {
    // store.dispatch(addName(eventName))
    //tags.forEach(el =>console.log(el))
    //store.dispatch(addEvent({ eventName, description, date, location, tags }));
    // console.log('tässä store : ', store.getState())
    // console.log(Array.isArray(store.getState().EventReducer[0].tags))
    //setEventName("");
    //setDescription("");
  //   setDate(new Date());
  //   setTags([]);
  //   setView(false);
  // };
  const goToSelect = () => {
    setView(true)
  }

  // Luodun eventin lähetys
  const sendEvent = () => {
    // let start_s = store.getState().EventReducer[0].date;
    // let event_s = store.getState().EventReducer[0].eventName;
    // let bio_s = store.getState().EventReducer[0].description;
    // let tagit_s = store.getState().EventReducer[0].tags;
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
    if(eventName.length > 2 && date != null && description != ""){
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
    }else{
      // Construct message of known issues and pass it as parameter for indicator message
      let message = ["Invalid fields : "]

       if(bodi.data.displayName=="")
         message.push(" Name ")  
       if(bodi.data.bio=="")
          message.push(" Description ")
       if(bodi.data.eventStart==null)
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
      // you can also add onPRess -function
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

  const fetchAddress = (la, lo) => {
    let key = global.key;
    let long = lo;
    let lat = la;
    console.log('TÄMÄ ', la)
    const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${long}&includeRoadMetadata=true&includeNearestIntersection=true`;
    console.log(url)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setValue(data.results[0].locations[0].adminArea5 + ", " + data.results[0].locations[0].street);
        // value above is string version and below example for location object for more values
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

          <Text style={[styles.title, styles.marginTopTen]}>Event location :</Text>
          <Text style={[styles.title, styles.marginTopTen]}> - {value /*place.street + ', ' +  place.city */}</Text>
          <View style={styles.viewFirst}>
           {/* <Modal
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
            </Modal> */}
            <Button
            buttonStyle={{backgroundColor: 'orange',  alignSelf: 'center'}} titleStyle={{color: 'black'}}
              onPress={() => {
                 setView(false); // view true, remove modal call  // vanha : setModalVisible(true);
              }}
              title="Select another"
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
            <Button buttonStyle={{backgroundColor: 'orange', alignSelf: 'center'}} titleStyle={{color: 'black'}} onPress={ sendEvent/* sendEvent logTiedot*/} title="Save event" />
          </View>
        </View>
      ) :


        (<View >
           <Text style={{marginTop: 50}}>current : {value}</Text>
            <MapView style={styles.mapView} region={region}>
            
              <Marker
                coordinate={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                title={value}
              />
            </MapView>
           
            <View style={{marginTop: '100%'}}>
            
           
           
          </View>
          <View style={{backgroundColor: 'black', marginTop: '10%'}}>
          <TextInput style={styles.addEventTextbox} 
                      onChangeText={(text) => setNewValue(text)}
                      value={newValue}
                      onEndEditing={fetchCoordinates}
                      placeholder={value}
                      placeholderTextColor="grey"
                      />
          <Text></Text>
          <Button buttonStyle={{backgroundColor: 'orange', width: '50%', alignSelf: 'center'}} titleStyle={{color: 'black'}} title="confirm address" onPress={goToSelect} />
          </View>
        </View>)


      /*(
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
            ) */}
    </ScrollView>
  );
}

// hox! Reducer not currently being used due changes in structure
const mapStateToProps = (state) => ({
  EventReducer: state.EventReducer,
});
// Komponentti yhdistetään reducerin saataville ja annetaan parametreiksi state, action ja main func
const Add_Event = connect(mapStateToProps, { addEvent })(Add_Eventti);
// Export ln:177
export default Add_Event;
