import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';



class Card extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.card, { backgroundColor: this.props.backgroundColor }]}>

          <TouchableOpacity
            style={styles.button}>
            <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869_960_720.jpg' }} style={{ width: 300, height: 300 }} />
          </TouchableOpacity>

          <View style={{ position: 'absolute', top: 0, left: 0, right: 150, bottom: 0, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 40, color: 'white'}}>Nimi Ikä</Text>
            <Text style={{ fontSize: 20, color: 'white' }}>Paikalla viimeksi</Text>
            <Text style={{ fontSize: 20, color: 'white' }}>3 km</Text>
          </View>
        </View>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

// korttien data on tässä
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { text: 'Tomato', backgroundColor: 'red' },
        { text: 'Aubergine', backgroundColor: 'purple' },
        { text: 'Courgette', backgroundColor: 'green' },
        { text: 'Blueberry', backgroundColor: 'blue' },
        { text: 'Umm...', backgroundColor: 'cyan' },
        { text: 'orange', backgroundColor: 'orange' },
      ]
    };
  }

  // konsoliin tieto mihin swipettiin
  handleYup(card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope(card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        // loop={false}
        //cardRemoved={this.cardRemoved.bind(this)}
        useNativeDriver = {true}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
