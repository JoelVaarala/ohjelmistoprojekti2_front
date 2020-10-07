import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import SwipeCards from "react-native-swipe-cards";
import { Icon, Avatar } from "react-native-elements";



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
      <View style={{ flex: 1 }}>
        <View style={[{ backgroundColor: this.props.backgroundColor }]}>
          <TouchableOpacity>
            <Image source={{ uri: this.props.images[0] }} style={styles.card} />
            <View style={{ position: "absolute", top: 0, left: 15, right: 150, justifyContent: "flex-end", alignItems: "flex-start" }}>
              <Image
                source={require("../pictures/darkish.png")}
                style={{ height: 400, width: 350, right: 15, top: 25, opacity: 0.9, borderRadius: 5 }}
              />
              <View style={{ bottom: 40 }}> 
                {
                  this.props.isEvent ? (
                    <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>{this.props.displayName}  in 12h hours </Text>
                  ) : (
                      <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>{this.props.displayName}    {this.props.age}</Text>
                    )
                }

                <Text style={{ fontSize: 12, color: "white" }}>{this.props.tags}</Text>
                <Text style={{ fontSize: 12, color: "white" }}>{this.props.distance} km away</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

<Image source={require("../pictures/darkish.png")} style={{ height: 400, width: 350, bottom: -40, right: 15, opacity: 0.9, borderRadius: 5 }} />;

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <Text style={styles.noMoreCardsText}>No more cards</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 445,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    bottom: 20,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
});

function PostSwipe(liked, user) {
  //Connectaa endpointiin, lähettää parametrinä omat hakutoiveet. Vaihtoehtona että bäkki itse noutas firebasesta mutta ei kai tarpeen?
  let myData = {
    data: {
      liked: liked,
      target: user.uid, //korjaa findSwipeablesin blabla vanhaan.
      isEvent: false //tarviko tätä, eiks swipe nyt bäkissä automaattisesti katsonut et onks user vai event
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
