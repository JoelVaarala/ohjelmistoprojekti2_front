import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import SwipeCards from "react-native-swipe-cards";
import { Icon, Avatar } from "react-native-elements";
import styles from '../styles';



class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nimi: props.text
    };
    console.log("Card prop")
    console.log(props)

  }




  render() {
    return (
      <View style={styles.flexOne}>
        <View style={[{ backgroundColor: this.props.backgroundColor }]}>
          <TouchableOpacity>
            <Image source={{ uri: this.props.images[0] }} style={styles.card} />
            <View style={styles.cardContainer}>
              <Image
                source={require("../pictures/darkish.png")}
                style={styles.darkishStyle}
              />
              <View style={styles.marginBottomForty}> 
                {
                  this.props.isEvent ? (
                    <Text style={styles.eventInfo}>{this.props.displayName}  in 12h hours </Text>
                  ) : (
                      <Text style={styles.eventInfo}>{this.props.displayName} {this.props.age}</Text>
                    )
                }

                <Text style={styles.eventInfoBio}>{this.props.tags}</Text>
                <Text style={styles.eventInfoBio}>{this.props.distance} km away</Text>
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
      cards: props.vaihtoehdot
    }
    console.log("///")
    console.log("///")
    console.log("///")
    console.log("///")
    console.log("///")
    console.log("///")
    console.log(this.props)
  }

  // konsoliin tieto mihin swipettiin
  //lähetetään bäkkiin tieto että swipettiin tälle, parametreinä, swipeäjä ja swipettäjä + suunta.
  handleYup(card) {
    console.log(card)
    // this.PostSwipe(true)
    PostSwipe(true, card)
  }
  handleNope(card) {
    PostSwipe(false, card)
    // PostSwipe(false)
  }
  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
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
      swipeAs : null
    },
    "uid": global.myUserData.uid,
    "idToken": global.myUserData.idToken,
  }
  console.log("Swiped "+liked+ " for " +user)
  console.log(JSON.stringify(myData))

  fetch(global.url + "swipe", {
    // fetch("http://192.168.56.1:5001/ohpro2-f30e5/us-central1/swipe" , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(body)
    body: JSON.stringify(myData)

  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(err => console.error(err))
  //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
}
