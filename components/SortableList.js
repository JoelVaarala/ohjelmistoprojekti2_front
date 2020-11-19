import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, Image, View, Dimensions, Platform, PickerIOS, } from 'react-native';
import { onChange } from 'react-native-reanimated';
import SortableList from 'react-native-sortable-list';

const window = Dimensions.get('window');

export default class Horizontal extends Component {

  constructor(props) {
    console.log(' LOOK HERE   ', props.kuvat)
    super(props);
    this.state = {
      data: this.props.kuvat,
      order: this.props.order,
    };
  }

  render() {
    let onChangeOrder = (nextOrder) => {
      this.setState({ order: nextOrder })
      const ordar = nextOrder;
      // console.log("jeejee", nextOrder)
      const images = this.props.kuvat
      //  console.log("ÖÖÖÖÖÖÖÖÖÖ", images)
      return images;
    }

    return (
      <View style={styles.container}>
        <SortableList
          horizontal
          style={styles.list}
          scrollEnabled={false}
          contentContainerStyle={styles.contentContainer}
          data={this.props.kuvat}
          // order={this.props.order}
          onChangeOrder={onChangeOrder}
          onReleaseRow={TallennaData(this.state.order, this.state.data)}
          renderRow={this._renderRow} />
      </View>
    );
  }

  _renderRow = ({ data, active }) => {
    return <Row data={data} active={active} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);
    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }


  render() {
    const { data, active } = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Image source={{ uri: data }} style={styles.image} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    height: 210,
    width: window.width,
  },

  contentContainer: {
    ...Platform.select({
      ios: {
        paddingVertical: 30,
      },

      android: {
        paddingVertical: 0,
      }
    })
  },

  row: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 1,
    width: 110,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        elevation: 0,
        marginHorizontal: 5,
      },
    })
  },

  image: {
    width: '100%',
    height: '100%',
  },

  text: {
    fontSize: 18,
    color: '#222222',
  },
});


function TallennaData(order, images) {

  console.log(order)
  console.log(images)
  const pictures = []

  for (let i = 0; i < images.length; i++) {
    pictures.push(images[order[i]])
  }
  let body = {
    data: {
      images: pictures,
    },
    uid: global.myUserData.uid,
    idToken: global.myUserData.idToken,
  };
  console.log("LOGIII", body)

  fetch(global.url + 'profileUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("DATAa", data)
    })
    .catch((err) => console.error(err));
}