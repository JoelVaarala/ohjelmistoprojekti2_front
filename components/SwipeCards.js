import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import SwipeCards from "react-native-swipe-cards";
import { Icon } from "react-native-elements";
import styles from "../styles";
import { store } from "../redux/index";
import { getDistance } from "geolib";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagit: this.separatedTags(),
      distance: this.calculateDistance(),
      time: this.timeUntillEvent(),
    };
  }

  // Calculate the time when event is starting from now
  timeUntillEvent() {
    let time = "";
    if ("eventStart" in this.props) {
      time = new Date(this.props.eventStart);
      let now = new Date();
      let comparisonTime = Math.floor((time - now) / 60e3);

      if (comparisonTime < 60) {
        time = comparisonTime.toString() + " min";
      } else if (comparisonTime >= 60 && comparisonTime < 1440) {
        time = Math.round(comparisonTime / 60).toString() + " hours";
      } else if (comparisonTime >= 1440) {
        time = Math.round(comparisonTime / 60 / 24).toString() + " days";
      } else {
        // "Default incase event lacks valid starting time"
        time = "unavailable";
      }
    }
    return time;
  }
  // Calculate the distance of the event to the user
  calculateDistance() {
    let distance = Math.round(
      getDistance(
        { latitude: this.props.position.geopoint._latitude, longitude: this.props.position.geopoint._longitude },
        { latitude: store.getState().UserDataReducer[0].latitude, longitude: store.getState().UserDataReducer[0].longitude }
      ) / 1000
    );
    // because distance is already rounded "less than km away" is displayed starting from even 1
    if (distance > 1) return distance;
    else return "less than";
  }

  // returns tags in more displayable form for the card
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
                  <Text style={styles.swipesUserInfo}>
                    {this.props.displayName} in {this.state.time}{" "}
                  </Text>
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

// Card data
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.options,
    };
  }

  // Swipe actions
  handleYup(card) {
    PostSwipe(true, card);
  }
  handleNope(card) {
    PostSwipe(false, card);
  }

  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    return (
      <SwipeCards
        cards={this.state.cards}
        useNativeDriver={true}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        hasMaybeAction
      />
    );
  }
}

// Posts swiping result to backend, params swipe directions and user id
function PostSwipe(liked, user) {
  let myData = {
    data: {
      liked: liked,
      target: user.uid,
      isEvent: false,
      swipeAs: null,
    },
    uid: store.getState().UserDataReducer[0].id,
    idToken: store.getState().UserDataReducer[0].token,
  };

  fetch(store.getState().DefaultReducer[0].url + "swipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.error(err));
}