import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
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
        <View>
          <TouchableOpacity>
            <Image source={{ uri: this.props.images[0] }} style={styles.card} />
            <View style={styles.cardContainer}>
              <Image
                source={require("../pictures/darkish.png")}
                style={styles.imageShadow}
              />
              <View style={styles.eventInfoMargin}> 
                {
                  this.props.isEvent ? (
                    <Text style={styles.eventInfo}>{this.props.displayName}  in 12h hours </Text>
                  ) : (
                      <Text style={styles.eventInfo}>{this.props.displayName}    {this.props.age}</Text>
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
        <View style={styles.noMoreCardsContent}>
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

    //Otetaan pois tää kovakoodattu ja käytetään propsina tulevaa. 
    //propsissa tulee documentid, nimi, avatarurli
    // this.state = {
    //   cards: [
    //     { text: "Tomato" },
    //     { text: "Aubergine", backgroundColor: "purple" },
    //     { text: "Courgette", backgroundColor: "green" },
    //     { text: "Blueberry", backgroundColor: "blue" },
    //     { text: "Umm...", backgroundColor: "cyan" },
    //     { text: "orange", backgroundColor: "orange" },
    //   ],
    // };

    this.state ={
      cards : props.vaihtoehdot
    }
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
    PostSwipe(true, card.user)
  }
  handleNope(card) {
    PostSwipe(false,card.user)
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
  let data = { 
    liked : liked, 
    target : user ,
    idToken : "dummy" ,  //myöhemmin idtokeni 
    uid : "qREmoPw72NRHB2JA6uBCKJyuWhY2"  //myöhemmin käyttäjän oma tokeni
  }
  console.log(JSON.stringify(data))
  console.log(data)
  fetch(global.url+"swipe" , {
  // fetch("http://192.168.56.1:5001/ohpro2-f30e5/us-central1/swipe" , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      // body: JSON.stringify(body)
      body: JSON.stringify(data)

  })
  .then(response => response.json())
  .then(data => {
      console.log(data)
  })
  .catch(err => console.error(err))
  //palauttaa asynscista arrayn, sijoitetaan swipettaviin.
}
