import * as React from "react";
import { View, SafeAreaView, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import styles from "../styles";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

// Photo carousel component
export default class App extends React.Component {

  constructor(props, { navigation, route }) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: this.props.kuvat,
    };
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.carouselBackground}>
        <Image style={styles.imageSize} source={{ uri: item }} />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.carouselSafeAreaView}>
        <View style={styles.carouselContainer}>
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.props.kuvat}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth * 0.5}
            sliderHeight={viewportHeight}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}
