import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, TimePickerAndroid } from "react-native";
import { color } from "react-native-reanimated";
import SwipeCards from "react-native-swipe-cards";
import { Icon, Avatar } from "react-native-elements";
import styles from "../styles";
import { getCoordinateKeys, getDistance } from 'geolib';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nimi: props.text, // Mikä tämä on???
      tagit: this.separatedTags(),
      distance: this.calculateDistance(),
      time: this.timeUntillEvent(),
    };
    // console.log("Card prop");
    //  console.log(props);
  }


  timeUntillEvent() {
    let time = "";
    if('eventStart' in this.props){
       
        //time = new Date("2020-11-16T14:35:00.000Z");  // test ISO-string
        time = new Date(this.props.eventStart);
        let now = new Date();
        let aika = Math.floor((time - now) / 60e3)
        
        if(aika < 60){
          time = aika.toString() + " min"
          console.log(time)
        }else if (aika >= 60 && aika < 1440){
          time = Math.round(aika/60).toString() + " hours"
          console.log(time)
        }else if (aika >= 1440){
          time = Math.round(aika/60/24).toString() + " days"
          console.log(time)  
        }else{
          time = "unavaible"
        }
    }
    return time;
  }

   calculateDistance() {
    let distance = Math.round(getDistance(
      { latitude: this.props.position.geopoint._latitude, longitude:  this.props.position.geopoint._longitude},
      { latitude: global.myUserData.filters.myLocation.latitude, longitude: global.myUserData.filters.myLocation.longitude } 
      )/1000);
      return distance;
  }

  separatedTags() {
    let tags = this.props.tags.join(", ");
    return tags;
}

  render() {
    return (
      <View style={styles.flexOne}>
        <View style={[{ backgroundColor: this.props.backgroundColor }]}>
          <TouchableOpacity>
            <Image source={{ uri: this.props.images[0] }} style={styles.card} />
            <View style={styles.cardContainer}>
              <Image source={require("../pictures/darkish.png")} style={styles.shadowImage} />
              <View style={styles.swipesUserInfosContainer}>
                {this.props.isEvent ? (
                  <Text style={styles.swipesUserInfo}>{this.props.displayName} in {this.state.time} </Text>
                ) : (
                  <Text style={styles.swipesUserInfo}>
                    {this.props.displayName} {this.props.age}
                  </Text>
                )}

                <Text style={styles.eventInfoBio}>{this.state.tagit}</Text>
                <Text style={styles.eventInfoBio}>{this.state.distance} km away</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCardsContent}>
        <View>
          <Text style={styles.noMoreCardsText}>No more cards</Text>
        </View>
        <View style={styles.containerCenter}>
          <Icon reverse name="refresh" />
        </View>
      </View>
    );
  }
}

// korttien data on tässä
export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: props.vaihtoehdot,
    };
    console.log("///");
    console.log("///");
    console.log("///");
    console.log("///");
    console.log("///");
    console.log("///");
    console.log(this.props);
  }

  // konsoliin tieto mihin swipettiin
  //lähetetään bäkkiin tieto että swipettiin tälle, parametreinä, swipeäjä ja swipettäjä + suunta.
  handleYup(card) {
    console.log(card);
    // this.PostSwipe(true)
    PostSwipe(true, card);
  }
  handleNope(card) {
    PostSwipe(false, card);
    // PostSwipe(false)
  }
  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }

  onClickHandler(){
    console.log("ASdadsadasd")
  }

  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        // loop={false}
        //cardRemoved={this.cardRemoved.bind(this)}
        useNativeDriver={true}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        onClickHandler={this.onClickHandler}
        hasMaybeAction
      />
    );
  }
}

function PostSwipe(liked, user) {
  //Connectaa endpointiin, lähettää parametrinä omat hakutoiveet. Vaihtoehtona että bäkki itse noutas firebasesta mutta ei kai tarpeen?
  let myData = {
    data: {
      liked: liked,
      target: user.uid, //korjaa findSwipeablesin blabla vanhaan.
      isEvent: false, //tarviko tätä, eiks swipe nyt bäkissä automaattisesti katsonut et onks user vai event
      swipeAs: null,
    },
    uid: global.myUserData.uid,
    idToken: global.myUserData.idToken,
  };
  console.log("Swiped " + liked + " for " + user);
  console.log(JSON.stringify(myData));

  fetch(global.url + "swipe", {
    // fetch("http://192.168.56.1:5001/ohpro2-f30e5/us-central1/swipe" , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(body)
    body: JSON.stringify(myData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error(err));
  //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
}
